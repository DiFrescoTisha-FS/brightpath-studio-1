// Tests for google-apps-script/contact-form-handler/Code.gs, run in a local
// emulator (tests/support/apps-script-emulator.js). Nothing contacts Google.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createAppsScript } from './support/apps-script-emulator.js';

const SECRET = 'test-secret-0123456789abcdef0123456789abcdef';
const PROPS = { SHARED_SECRET: SECRET, NOTIFY_TO: 'contact@brightpathwebstudio.org' };
const ID = '3f2b8c1e-4d5a-4b6c-9e7f-0a1b2c3d4e5f';
const VISITOR = { fullName: 'Ada Lovelace', email: 'ada@example.com', message: 'We need a new church website.' };
const request = (overrides = {}) => ({ secret: SECRET, submissionId: ID, ...VISITOR, ...overrides });

const noPersonalDataIn = (logs) => {
  const text = JSON.stringify(logs);
  return !text.includes(VISITOR.fullName) && !text.includes(VISITOR.email) && !text.includes(VISITOR.message);
};

test('saves a valid inquiry, confirms the row, then notifies', () => {
  const app = createAppsScript({ props: PROPS });
  const { body, mimeType } = app.doPost(request());
  assert.deepEqual(body, { ok: true, code: 'saved', submissionId: ID, notification: 'sent' });
  assert.equal(mimeType, 'application/json');
  const [row] = app.sheet();
  assert.equal(Object.prototype.toString.call(row[0]), '[object Date]'); // Date from the script's realm
  assert.deepEqual(row.slice(1), [VISITOR.fullName, VISITOR.email, VISITOR.message, ID, 'sent']);
  assert.equal(app.mails.length, 1);
  assert.equal(app.mails[0].to, 'contact@brightpathwebstudio.org');
  assert.equal(app.mails[0].replyTo, VISITOR.email);
  assert.match(app.mails[0].body, /We need a new church website\./);
});

test('a retry with the same submission ID is acknowledged without a second row or email', () => {
  const app = createAppsScript({ props: PROPS });
  app.doPost(request());
  const { body } = app.doPost(request());
  assert.deepEqual(body, { ok: true, code: 'duplicate', submissionId: ID, notification: 'sent' });
  assert.equal(app.sheet().length, 1);
  assert.equal(app.mails.length, 1);
});

test('deduplication only looks at the Submission ID column', () => {
  // An older v1 row (4 columns) whose message happens to equal the new ID.
  const app = createAppsScript({ props: PROPS, rows: [[new Date(), 'Old', 'old@example.com', ID]] });
  const { body } = app.doPost(request());
  assert.equal(body.code, 'saved');
  assert.equal(app.sheet().length, 2);
  assert.deepEqual(app.sheet()[0].slice(1), ['Old', 'old@example.com', ID]); // existing row untouched
});

test('neutralises spreadsheet formula injection', () => {
  const app = createAppsScript({ props: PROPS });
  app.doPost(request({ fullName: '=HYPERLINK("http://evil.example","click")', message: '+1 555 0100\nrest' }));
  const [row] = app.sheet();
  assert.equal(row[1], '\'=HYPERLINK("http://evil.example","click")');
  assert.equal(row[3], "'+1 555 0100\nrest");
  assert.equal(row[2], VISITOR.email); // ordinary values are stored unchanged
  const app2 = createAppsScript({ props: PROPS });
  app2.doPost(request({ email: '-dash@example.com', message: '@mention me' }));
  assert.equal(app2.sheet()[0][2], "'-dash@example.com");
  assert.equal(app2.sheet()[0][3], "'@mention me");
});

test('refuses requests without the shared secret', () => {
  for (const secret of [undefined, '', 'wrong', SECRET + 'x']) {
    const app = createAppsScript({ props: PROPS });
    const { body } = app.doPost(request({ secret }));
    assert.deepEqual(body, { ok: false, code: 'unauthorized' });
    assert.equal(app.sheet().length, 0);
    assert.equal(app.mails.length, 0);
  }
});

test('reports not_configured when script properties are missing', () => {
  for (const props of [{}, { SHARED_SECRET: SECRET }, { NOTIFY_TO: 'a@b.co' }]) {
    const app = createAppsScript({ props });
    assert.deepEqual(app.doPost(request()).body, { ok: false, code: 'not_configured' });
    assert.equal(app.sheet().length, 0);
  }
});

test('rejects invalid input without writing', () => {
  const cases = [
    'not json',
    'null',
    request({ submissionId: 'short' }),
    request({ submissionId: 'has spaces in it 1234' }),
    request({ fullName: '   ' }),
    request({ email: 'not-an-email' }),
    request({ message: '' }),
    'x'.repeat(20001),
  ];
  for (const body of cases) {
    const app = createAppsScript({ props: PROPS });
    assert.deepEqual(app.doPost(body).body, { ok: false, code: 'invalid_request' });
    assert.equal(app.sheet().length, 0);
    assert.equal(app.mails.length, 0);
  }
});

test('caps field lengths and strips control characters', () => {
  const app = createAppsScript({ props: PROPS });
  app.doPost(request({ fullName: 'N'.repeat(300) + '\u0007', message: 'line one\r\nline two\u0000' }));
  const [row] = app.sheet();
  assert.equal(row[1].length, 200);
  assert.equal(row[3], 'line one\nline two');
});

test('a missing configured tab fails without writing elsewhere or emailing', () => {
  const app = createAppsScript({ props: { ...PROPS, SHEET_NAME: 'Submissions' }, tabs: ['Sheet1'] });
  assert.deepEqual(app.doPost(request()).body, { ok: false, code: 'server_error' });
  assert.equal(app.sheet('Sheet1').length, 0);
  assert.equal(app.mails.length, 0);
});

test('writes to the configured tab when it exists', () => {
  const app = createAppsScript({ props: { ...PROPS, SHEET_NAME: 'Submissions' }, tabs: ['Notes', 'Submissions'] });
  assert.equal(app.doPost(request()).body.code, 'saved');
  assert.equal(app.sheet('Submissions').length, 1);
  assert.equal(app.sheet('Notes').length, 0);
});

test('a spreadsheet write error is reported as a failure, with no email', () => {
  const app = createAppsScript({ props: PROPS, faults: { appendThrows: true } });
  const { body } = app.doPost(request());
  assert.deepEqual(body, { ok: false, code: 'server_error' });
  assert.equal(app.mails.length, 0);
  assert.ok(!JSON.stringify(body).includes('Spreadsheets')); // internal message not exposed
});

test('a write that does not land is reported as not_saved, with no email', () => {
  const app = createAppsScript({ props: PROPS, faults: { appendDrops: true } });
  assert.deepEqual(app.doPost(request()).body, { ok: false, code: 'not_saved', submissionId: ID });
  assert.equal(app.mails.length, 0);
});

test('a flush error is reported as a failure', () => {
  const app = createAppsScript({ props: PROPS, faults: { flushThrows: true } });
  assert.equal(app.doPost(request()).body.ok, false);
  assert.equal(app.mails.length, 0);
});

test('an email failure keeps the saved inquiry and records the failure', () => {
  const app = createAppsScript({ props: PROPS, faults: { mailThrows: true } });
  const { body } = app.doPost(request());
  assert.deepEqual(body, { ok: true, code: 'saved', submissionId: ID, notification: 'failed' });
  assert.equal(app.sheet()[0][5], 'failed');
  // A later retry reports the stored status and doesn't re-send.
  app.faults.mailThrows = false;
  assert.deepEqual(app.doPost(request()).body, { ok: true, code: 'duplicate', submissionId: ID, notification: 'failed' });
  assert.equal(app.mails.length, 0);
});

test('a busy lock is reported so the caller can retry', () => {
  const app = createAppsScript({ props: PROPS, faults: { lockBusy: true } });
  assert.deepEqual(app.doPost(request()).body, { ok: false, code: 'busy', submissionId: ID });
  assert.equal(app.sheet().length, 0);
});

test('doGet answers cleanly', () => {
  const app = createAppsScript({ props: PROPS });
  assert.deepEqual(app.doGet().body, { ok: false, code: 'method_not_allowed' });
});

test('logs never contain visitor names, emails or messages', () => {
  const scenarios = [{}, { mailThrows: true }, { appendThrows: true }, { appendDrops: true }];
  for (const faults of scenarios) {
    const app = createAppsScript({ props: PROPS, faults });
    app.doPost(request());
    assert.ok(noPersonalDataIn(app.logs), `PII in logs for ${JSON.stringify(faults)}: ${JSON.stringify(app.logs)}`);
  }
});
