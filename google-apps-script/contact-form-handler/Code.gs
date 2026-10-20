/**
 * BrightPath Web Studio — Contact Form Handler (v2)
 *
 * Works as a standalone project (production: set SPREADSHEET_ID) or bound to
 * the Sheet (the TEST project). Called only
 * by the Netlify Function `contact-inquiry`, never directly by browsers. That
 * function decides what the visitor sees from the JSON this returns, so every
 * path returns structured JSON and success is reported only after the row has
 * been written and read back.
 *
 * Script properties (Project Settings → Script properties):
 *   SHARED_SECRET  required — long random string; the same value is set as
 *                  CONTACT_SHARED_SECRET in Netlify. Requests without it are
 *                  refused, so the public /exec URL can't be used to spam the Sheet.
 *   NOTIFY_TO      required — notification recipient(s), comma-separated.
 *   SPREADSHEET_ID required for a standalone project — the ID from the Sheet's
 *                  URL (docs.google.com/spreadsheets/d/<ID>/edit). Optional for
 *                  a project bound to the Sheet, which falls back to that Sheet.
 *                  Kept out of the code so the production ID never reaches the
 *                  public repository.
 *   SHEET_NAME     optional — tab to write to. If set and missing, the request
 *                  fails rather than writing somewhere unexpected. Defaults to
 *                  the first tab.
 *
 * Columns: Timestamp | Full Name | Email | Message | Submission ID | Notification
 * (the first four match the v1 layout, so existing rows stay aligned).
 *
 * Responses: { ok: true,  code: 'saved' | 'duplicate', submissionId, notification }
 *            { ok: false, code: 'invalid_request' | 'unauthorized' | 'not_configured'
 *                              | 'busy' | 'not_saved' | 'server_error' }
 * Error responses never include visitor data or internal error messages.
 */

var ID_COLUMN = 5;
var NOTIFICATION_COLUMN = 6;
var LIMITS = { fullName: 200, email: 254, message: 5000, body: 20000 };
var ID_PATTERN = /^[A-Za-z0-9-]{16,64}$/;
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  var submissionId = '';
  try {
    var props = PropertiesService.getScriptProperties();
    var secret = props.getProperty('SHARED_SECRET');
    var notifyTo = props.getProperty('NOTIFY_TO');
    var hasSpreadsheet = Boolean(props.getProperty('SPREADSHEET_ID')) || Boolean(SpreadsheetApp.getActiveSpreadsheet());
    if (!secret || !notifyTo || !hasSpreadsheet) {
      console.error('contact: SHARED_SECRET, NOTIFY_TO or SPREADSHEET_ID script property is missing');
      return respond_({ ok: false, code: 'not_configured' });
    }

    var data = parseBody_(e);
    if (!data) return respond_({ ok: false, code: 'invalid_request' });
    if (!safeEquals_(String(data.secret || ''), secret)) {
      return respond_({ ok: false, code: 'unauthorized' });
    }

    submissionId = String(data.submissionId || '');
    var fullName = clean_(data.fullName, LIMITS.fullName, false);
    var email = clean_(data.email, LIMITS.email, false);
    var message = clean_(data.message, LIMITS.message, true);
    if (!ID_PATTERN.test(submissionId) || !fullName || !message || !EMAIL_PATTERN.test(email)) {
      return respond_({ ok: false, code: 'invalid_request' });
    }

    // One writer at a time, so a retry racing its original can't add two rows.
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return respond_({ ok: false, code: 'busy', submissionId: submissionId });

    var sheet;
    var row;
    try {
      sheet = getSheet_(props);
      var existingRow = findRow_(sheet, submissionId);
      if (existingRow) {
        var previous = String(sheet.getRange(existingRow, NOTIFICATION_COLUMN).getValue() || 'unknown');
        return respond_({ ok: true, code: 'duplicate', submissionId: submissionId, notification: previous });
      }

      sheet.appendRow([new Date(), safe_(fullName), safe_(email), safe_(message), submissionId, 'pending']);
      SpreadsheetApp.flush();

      // Confirm the row is really there before telling anyone it was saved.
      row = findRow_(sheet, submissionId);
      if (!row) {
        console.error('contact: row missing after append', submissionId);
        return respond_({ ok: false, code: 'not_saved', submissionId: submissionId });
      }
    } finally {
      lock.releaseLock();
    }

    // The inquiry is saved. A notification failure is recorded, not fatal.
    var notification = 'sent';
    try {
      MailApp.sendEmail({
        to: notifyTo,
        replyTo: email,
        name: 'BrightPath Website',
        subject: 'New website inquiry from ' + fullName.replace(/[\r\n]+/g, ' '),
        body:
          'Name: ' + fullName + '\n' +
          'Email: ' + email + '\n\n' +
          message + '\n\n' +
          '—\nSubmission ID: ' + submissionId + '\n' +
          'Saved to the "Contact Form Submissions" sheet. Reply to this email to answer the visitor.',
      });
    } catch (mailError) {
      notification = 'failed';
      console.error('contact: notification failed', submissionId, mailError && mailError.message);
    }

    try {
      sheet.getRange(row, NOTIFICATION_COLUMN).setValue(notification);
    } catch (statusError) {
      console.error('contact: could not record notification status', submissionId, statusError && statusError.message);
    }

    return respond_({ ok: true, code: 'saved', submissionId: submissionId, notification: notification });
  } catch (err) {
    console.error('contact: unexpected error', submissionId, err && err.message);
    return respond_({ ok: false, code: 'server_error' });
  }
}

// Answers stray GET requests (e.g. someone opening the URL) cleanly instead of
// logging a failed execution.
function doGet() {
  return respond_({ ok: false, code: 'method_not_allowed' });
}

function parseBody_(e) {
  var contents = e && e.postData && e.postData.contents;
  if (!contents || contents.length > LIMITS.body) return null;
  try {
    var parsed = JSON.parse(contents);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (parseError) {
    return null;
  }
}

function getSheet_(props) {
  // A standalone project names its spreadsheet explicitly; a project bound to
  // the Sheet can fall back to it. An unknown or inaccessible ID throws, which
  // doPost reports as server_error without writing or emailing.
  var spreadsheetId = props.getProperty('SPREADSHEET_ID');
  var spreadsheet = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
  var name = props.getProperty('SHEET_NAME');
  if (!name) return spreadsheet.getSheets()[0];
  var sheet = spreadsheet.getSheetByName(name);
  if (!sheet) throw new Error('Configured SHEET_NAME tab not found');
  return sheet;
}

// Row number holding this submission ID in the ID column, or 0.
function findRow_(sheet, submissionId) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 1) return 0;
  var match = sheet
    .getRange(1, ID_COLUMN, lastRow, 1)
    .createTextFinder(submissionId)
    .matchEntireCell(true)
    .findNext();
  return match ? match.getRow() : 0;
}

// Trim, cap length, and drop control characters (keeping line breaks and tabs
// in the message only).
function clean_(value, maxLength, multiline) {
  var text = String(value == null ? '' : value);
  text = multiline
    ? text.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    : text.replace(/[\u0000-\u001f\u007f]/g, ' ');
  return text.trim().slice(0, maxLength);
}

// Sheets treats text starting with = + - @ (and tab/CR) as a formula. A leading
// apostrophe stores it as plain text; Sheets doesn't display the apostrophe.
function safe_(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function safeEquals_(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function respond_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
