/**
 * ============================================================================
 * AVM Real Estate — Google Apps Script Lead Ingestion Web App
 * Target Google Sheet: https://docs.google.com/spreadsheets/d/1UFPltSciOp76WUvW3-ATvln37zUvypq0GzuWUmXvTV8/
 * ============================================================================
 *
 * Privacy & Access:
 * - This Google Sheet is strictly PRIVATE to you (the creator/admin).
 * - Visitors on the website CANNOT see, open, or access this sheet.
 * - Submissions are securely piped through this server-side Web App endpoint.
 */

// Your Target Google Spreadsheet ID
var SPREADSHEET_ID = '1UFPltSciOp76WUvW3-ATvln37zUvypq0GzuWUmXvTV8';

// Name of the tab/sheet within your Google Spreadsheet
var SHEET_NAME = 'Enquiries';

// Columns in the order they will appear in the spreadsheet
var HEADERS = [
  'Timestamp',
  'Lead ID',
  'Full Name',
  'Phone Number',
  'Email',
  'City',
  'Preferred Location',
  'Property Type',
  'Configuration',
  'Budget Range',
  'Project ID',
  'Project Name',
  'Source Page',
  'Lead Source',
  'Message',
  'Lead Status',
  'Assigned Partner',
  'Follow-up Notes'
];

/**
 * Handle incoming POST requests from the website form
 */
function doPost(e) {
  try {
    // 1. Verify that request data exists
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({
        success: false,
        message: 'No data received.'
      }, 400);
    }

    // 2. Parse JSON payload
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return jsonResponse({
        success: false,
        message: 'Malformed request payload.'
      }, 400);
    }

    // 3. Honeypot check (anti-bot protection)
    if (data._hp && data._hp.length > 0) {
      return jsonResponse({
        success: true,
        message: 'Enquiry received.',
        leadId: 'BOT-DROPPED'
      });
    }

    // 4. Server-side validation
    var fullName = (data.fullName || '').toString().trim();
    var phone = (data.phone || '').toString().trim();

    if (!fullName) {
      return jsonResponse({
        success: false,
        message: 'Full name is required.'
      }, 400);
    }

    if (!phone) {
      return jsonResponse({
        success: false,
        message: 'Phone number is required.'
      }, 400);
    }

    // 5. Open the target spreadsheet (handles both bound and standalone script)
    var spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    } catch (err) {}
    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    }

    // Use Sheet1 (visible tab) or Enquiries or the first sheet tab
    var sheet = spreadsheet.getSheetByName('Sheet1') || spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];

    // If sheet has no rows yet, add formatted headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      formatHeaderRow(sheet);
    }

    // 6. Generate Lead ID and Timestamp
    var now = new Date();
    var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone() || 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
    var datePrefix = Utilities.formatDate(now, Session.getScriptTimeZone() || 'Asia/Kolkata', 'yyyyMMdd');
    var randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    var leadId = 'AVM-' + datePrefix + '-' + randomSuffix;

    // 7. Assemble row values matching HEADERS
    var row = [
      formattedDate,
      leadId,
      fullName,
      phone,
      (data.email || 'Not Provided').toString().trim(),
      (data.city || 'Pune').toString().trim(),
      (data.preferredLocation || 'Any Location').toString().trim(),
      (data.propertyType || 'Any Type').toString().trim(),
      (data.configuration || 'Any Configuration').toString().trim(),
      (data.budgetRange || 'Any Budget').toString().trim(),
      (data.projectId || 'general').toString().trim(),
      (data.projectName || 'General Enquiry').toString().trim(),
      (data.sourcePage || '').toString().trim(),
      (data.leadSource || 'Website').toString().trim(),
      (data.message || 'No specific message').toString().trim(),
      'New Lead',      // Initial lead status
      'Unassigned',    // Assigned partner
      ''               // Follow-up notes
    ];

    // 8. Append directly to Google Sheet
    sheet.appendRow(row);

    // 9. Return success response
    return jsonResponse({
      success: true,
      message: 'Thank you for your enquiry. Your details have been submitted successfully.',
      leadId: leadId
    });

  } catch (err) {
    Logger.log('Error in doPost: ' + err.toString());
    return jsonResponse({
      success: false,
      message: 'Internal error: ' + err.toString()
    }, 500);
  }
}

/**
 * Handle GET requests for health check
 */
function doGet(e) {
  return jsonResponse({
    status: 'healthy',
    targetSheet: 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID,
    timestamp: new Date().toISOString()
  });
}

/**
 * Format the header row with background styling and bold text
 */
function formatHeaderRow(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground('#2563EB'); // Standard Blue
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
}

/**
 * Helper to construct JSON response
 */
function jsonResponse(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
