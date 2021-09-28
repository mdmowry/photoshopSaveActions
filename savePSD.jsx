function savePSD( doc, saveFile) {
     doc.saveAs(saveFile);
}

var doc = app.activeDocument;
var docName = doc.name;
docName = docName.match(/(.*)(\.[^\.]+)/) ? docName = docName.match(/(.*)(\.[^\.]+)/):docName = [docName, docName];
var suffix = '';
var saveName = new File(decodeURI(doc.path)+'/'+docName[1]+suffix+'.psd');
savePSD( app.activeDocument, saveName);