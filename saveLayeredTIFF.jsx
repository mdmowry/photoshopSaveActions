function saveTIFF( doc, saveFile) {
     var saveOptions = new TiffSaveOptions( );
     saveOptions.imageCompression = TIFFEncoding.TIFFLZW;
     saveOptions.layers = true;
     doc.saveAs( saveFile, saveOptions, true);
}

var doc = app.activeDocument;
var docName = doc.name;
docName = docName.match(/(.*)(\.[^\.]+)/) ? docName = docName.match(/(.*)(\.[^\.]+)/):docName = [docName, docName];
var suffix = '';
var saveName = new File(decodeURI(doc.path)+'/'+docName[1]+suffix+'.TIF');
saveTIFF( app.activeDocument, saveName);