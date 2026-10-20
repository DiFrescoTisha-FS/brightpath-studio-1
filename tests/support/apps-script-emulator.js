// Runs google-apps-script/contact-form-handler/Code.gs in Node with in-memory
// stand-ins for the Apps Script services it uses, so its logic can be tested
// (and fault-injected) without touching Google.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const CODE_PATH = new URL('../../google-apps-script/contact-form-handler/Code.gs', import.meta.url);

/**
 * @param {object} options
 * @param {Record<string,string>} [options.props]  script properties
 * @param {object} [options.faults]  { lockBusy, appendThrows, appendDrops, mailThrows, flushThrows }
 * @param {Array<Array<unknown>>} [options.rows]   pre-existing sheet rows
 * @param {string[]} [options.tabs]                tab names (first is default)
 */
export function createAppsScript({ props = {}, faults = {}, rows = [], tabs = ['Sheet1'] } = {}) {
  const sheets = Object.fromEntries(tabs.map((name, i) => [name, i === 0 ? rows : []]));
  const mails = [];
  const logs = [];

  const makeSheet = (data) => ({
    getLastRow: () => data.length,
    appendRow(values) {
      if (faults.appendThrows) throw new Error('Service Spreadsheets failed while accessing document');
      if (faults.appendDrops) return; // simulates a write that silently didn't land
      data.push([...values]);
    },
    getRange(row, col, numRows = 1) {
      return {
        getValue: () => (data[row - 1] ? data[row - 1][col - 1] ?? '' : ''),
        setValue: (value) => {
          if (data[row - 1]) data[row - 1][col - 1] = value;
        },
        createTextFinder(text) {
          let exact = false;
          const finder = {
            matchEntireCell(flag) {
              exact = flag;
              return finder;
            },
            findNext() {
              for (let r = row; r < row + numRows; r++) {
                const cell = String(data[r - 1]?.[col - 1] ?? '');
                if (exact ? cell === text : cell.includes(text)) return { getRow: () => r };
              }
              return null;
            },
          };
          return finder;
        },
      };
    },
  });

  const context = vm.createContext({
    console: {
      log: (...a) => logs.push(['log', ...a]),
      error: (...a) => logs.push(['error', ...a]),
    },
    PropertiesService: {
      getScriptProperties: () => ({ getProperty: (k) => (k in props ? props[k] : null) }),
    },
    LockService: {
      getScriptLock: () => ({
        tryLock: () => !faults.lockBusy,
        waitLock: () => {
          if (faults.lockBusy) throw new Error('Lock timeout');
        },
        releaseLock: () => {},
      }),
    },
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ({
        getSheets: () => tabs.map((t) => makeSheet(sheets[t])),
        getSheetByName: (name) => (name in sheets ? makeSheet(sheets[name]) : null),
      }),
      flush: () => {
        if (faults.flushThrows) throw new Error('flush failed');
      },
    },
    MailApp: {
      sendEmail(message) {
        if (faults.mailThrows) throw new Error('Invalid email: ' + message.to);
        mails.push(message);
      },
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput(content) {
        const output = { content, mimeType: 'text/plain' };
        output.setMimeType = (m) => {
          output.mimeType = m;
          return output;
        };
        return output;
      },
    },
  });
  vm.runInContext(readFileSync(CODE_PATH, 'utf8'), context, { filename: 'Code.gs' });

  const call = (fn, e) => {
    const output = context[fn](e);
    return { body: JSON.parse(output.content), mimeType: output.mimeType };
  };

  return {
    doPost: (body) => call('doPost', { postData: { contents: typeof body === 'string' ? body : JSON.stringify(body) } }),
    doGet: () => call('doGet', {}),
    sheet: (name = tabs[0]) => sheets[name],
    mails,
    logs,
    faults,
  };
}
