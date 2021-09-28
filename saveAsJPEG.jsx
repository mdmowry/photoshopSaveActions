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