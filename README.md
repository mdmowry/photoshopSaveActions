# photoshopSaveActions
javascript actions for quickly saving TIF, PSD, and JPEG output from Photoshop 

Hi all - after searching what seems to have been the entire internet to no avail and finding many people looking for the same things, I hacked these scripts together based 
on some code I found somewhere along the search. I cannot recall where I found it but to whoever the original author/s is/are of the parts and pieces, I am eternally grateful and beg forgiveness. 

Anyhow, four files here that have saved me hours of time in the few months I've been using them. I've not tested them on OSX. 
1) savePSD.jsx - saves a PSD version of the current document 
2) saveAsJPEG.jsx - saves JPEG version of the current document, quality = 10 
3) saveJPEG10_date.jsx - saves JPEG version of the current document, quality = 10, appends fast "YYMMDD.HHMM" suffix to file name.
4) saveLayeredTIFF.jsx - saves LayeredTIFF version with LZW compression

On Windows10, save these into the "C:\Program Files\Adobe\Adobe Photoshop 2021\Presets\Scripts\" directory and start/restart photoshop. Record teh scripts into Actions and 
assign a shortcut key....see "saveAsActions.jpg" 

Javascript source code if you're curious:

------------------------------------------------------------------------------------------------

function savePSD( doc, saveFile) {
     doc.saveAs(saveFile);
}

var doc = app.activeDocument;
var docName = doc.name;
docName = docName.match(/(.*)(\.[^\.]+)/) ? docName = docName.match(/(.*)(\.[^\.]+)/):docName = [docName, docName];
var suffix = '';
var saveName = new File(decodeURI(doc.path)+'/'+docName[1]+suffix+'.psd');
savePSD( app.activeDocument, saveName);

------------------------------------------------------------------------------------------------

#target photoshop
main();
function main(){
	if(!documents.length) return;
	var Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');
	try{var savePath = activeDocument.path;}
	catch(e){alert("You must save this document first!");}
	var fileList= savePath.getFiles(Name +"*.jpg").sort().reverse();
	var Suffix = 0;
	if(fileList.length){Suffix = Number(fileList[0].name.replace(/\.[^\.]+$/, '').match(/\d+$/));}
	Suffix= zeroPad(Suffix + 1, 3);
	var saveFile = File(savePath + "/" + Name + "_" + Suffix + ".jpg");
	SaveJPEG(saveFile,10);
		}
			function SaveJPEG(saveFile, jpegQuality){
			jpgSaveOptions = new JPEGSaveOptions();
			jpgSaveOptions.embedColorProfile = true;
			jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
			jpgSaveOptions.matte = MatteType.NONE;
			jpgSaveOptions.quality = jpegQuality; 
			activeDocument.saveAs(saveFile, jpgSaveOptions, true,Extension.LOWERCASE);
		};
	function zeroPad(n, s) { 
	   n = n.toString(); 
	   while (n.length < s)  n = '0' + n; 
	   return n; 
};

------------------------------------------------------------------------------------------------

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

------------------------------------------------------------------------------------------------

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

------------------------------------------------------------------------------------------------
