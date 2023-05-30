function doGet() {
  var content = getSheetData();
  var contentObject = {GoogleSheetData: content}
  return ContentService.createTextOutput(JSON.stringify(contentObject) ).setMimeType(ContentService.MimeType.JSON); 
}

function getSheetData()  { 
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName('Respuestas de formulario 1'); 
  var dataRange = dataSheet.getDataRange();
  var dataValues = dataRange.getValues();
  console.log(dataValues) 
  return dataValues;
}


////

function generarPDF() {
  // Config
  var colNombre = 3;
  var colEmpres = 4;
  var qrCode = 12;


  // ID
  const plantillaID = '1aDNt676DqhT2jdzPDpv5XcZUzfV52qj3jClREE0CkE0';
  const pdfID = '17oVarZ-gqv5DeIo-czjXsCjZyHBtMndc';
  const tempID = '17pobOlxrh5JuJbkjdQGK_vfE8bV7jZgJ';
  const sheetID = '1YUk6cmgyPyyBgK9ip6OAeEUe1NrlvqcjmPeKlJnK7f8';

  // Conections
  var doc = DocumentApp.openById(plantillaID);
  var archivoPlantilla = DriveApp.getFileById(plantillaID);
  var carpetaPDF = DriveApp.getFolderById(pdfID);
  var carpetaTemp = DriveApp.getFolderById(tempID);
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Respuestas");

  // Veriables 
  var filaActiva = hoja.getActiveRange().getRow();
  var nombre = hoja.getRange(filaActiva, colNombre).getValue();
  var empresa = hoja.getRange(filaActiva, colEmpres).getValue();
  var qr = hoja.getRange(filaActiva, qrCode).getValue();

  // Make copies
  var copiaPlantilla = archivoPlantilla.makeCopy(carpetaTemp);
  var copiaID = copiaPlantilla.getId();
  var doc = DocumentApp.openById(copiaID);
  doc.getBody().replaceText('{{nombre}}', nombre)
  doc.getBody().replaceText('{{empresa}}', empresa)
  doc.getBody().replaceText('{{qr}}', qr)
}


he element's attributes.


Sets the element's attributes.

The specified attributes parameter must be an object where each property name is an item in the DocumentApp.Attribute enumeration and each property value is the new value to be applied.

var body = DocumentApp.getActiveDocument().getBody();

// Define a custom paragraph style.
var style = {};
style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] =
DocumentApp.HorizontalAlignment.RIGHT;
style[DocumentApp.Attribute.FONT_FAMILY] = 'Calibri';
style[DocumentApp.Attribute.FONT_SIZE] = 18;
style[DocumentApp.Attribute.BOLD] = true;

// Append a plain paragraph.
var par = body.appendParagraph('A paragraph with custom style.');

// Apply the custom style.
par.setAttributes(style);


# Codigo que funsiona sin definir la posision del QR
function generarPDF() {
  // Config
  var colNombre = 3;
  var colEmpres = 4;
  var qrCode = 11;

  // ID
  const plantillaID = '1aDNt676DqhT2jdzPDpv5XcZUzfV52qj3jClREE0CkE0';
  const pdfID = '17oVarZ-gqv5DeIo-czjXsCjZyHBtMndc';
  const tempID = '17pobOlxrh5JuJbkjdQGK_vfE8bV7jZgJ';
  const sheetID = '1YUk6cmgyPyyBgK9ip6OAeEUe1NrlvqcjmPeKlJnK7f8';

  // Connections
  var doc = DocumentApp.openById(plantillaID);
  var archivoPlantilla = DriveApp.getFileById(plantillaID);
  var carpetaPDF = DriveApp.getFolderById(pdfID);
  var carpetaTemp = DriveApp.getFolderById(tempID);
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Respuestas");

  // Variables
  var filaActiva = hoja.getActiveRange().getRow();
  var nombre = hoja.getRange(filaActiva, colNombre).getValue();
  var empresa = hoja.getRange(filaActiva, colEmpres).getValue();
  var qr = hoja.getRange(filaActiva, qrCode).getValue();

  // Generate QR Code
  var qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(qr) + '&size=200x200';
  var options = {
    'muteHttpExceptions': true
  };
  var response = UrlFetchApp.fetch(qrCodeUrl, options);
  var qrCodeImage = response.getBlob();

  // Make copies
  var copiaPlantilla = archivoPlantilla.makeCopy(carpetaTemp);
  var copiaID = copiaPlantilla.getId();
  var copiaDoc = DocumentApp.openById(copiaID);

  // Insert QR Code at specified location

  var body = copiaDoc.getBody();
  var qrCodeElement = body.appendImage(qrCodeImage);
  qrCodeElement.setWidth(200).setHeight(200); // Adjust the width and height as desired
  
  
  // Replace variables
  body.replaceText('{{nombre}}', nombre);
  body.replaceText('{{empresa}}', empresa);
 

  // Save and close the document
  copiaDoc.saveAndClose();
}