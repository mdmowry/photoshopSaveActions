function saveJPEG( doc, saveFile, qty ) {
     var saveOptions = new JPEGSaveOptions( );
     saveOptions.embedColorProfile = true;
     saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
     saveOptions.matte = MatteType.NONE;
     saveOptions.quality = qty; 
     doc.saveAs( saveFile, saveOptions, true );
}

var x = new Date()
var yr=x.getFullYear().toString();
var year=yr.slice(2,20);
var mn=x.getMonth()+1
var mn=mn.toString();
var initChar = mn.charAt(0);
if (initChar != "0") {
     mn = "0" + mn;} 
var x1=year + mn + x.getDate().toString();
x1 = x1 + "-" +  x.getHours().toString()+x.getMinutes().toString()+x.getSeconds().toString();

var doc = app.activeDocument;
var docName = doc.name;
docName = docName.match(/(.*)(\.[^\.]+)/) ? docName = docName.match(/(.*)(\.[^\.]+)/):docName = [docName, docName];
var saveName = new File(decodeURI(doc.path)+'/'+docName[1]+x1+'.jpg');
saveJPEG( app.activeDocument, saveName, 10 );