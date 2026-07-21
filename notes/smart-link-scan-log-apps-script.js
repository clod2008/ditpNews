// Google Apps Script — pegar en Extensiones > Apps Script del Sheet elegido
// para el registro de escaneos del smart link. Ver notes/smart-link-instagram.md
// para los pasos de deploy como Web App.

function doPost(e) {
  var sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scans") ||
    createScansSheet_();

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.event || "",
    data.type || "",
    data.code || "",
    data.platform || "",
    data.referrer || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}

function createScansSheet_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Scans");
  sheet.appendRow(["Timestamp", "Evento", "Type", "Code", "Plataforma", "Referrer"]);
  return sheet;
}
