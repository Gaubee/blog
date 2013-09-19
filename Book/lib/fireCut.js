var fs = require("fs");
var basePath = "../Fiction";
var bookPath = "/三体/";
var fileName = "三体.txt";

function writeFile(fs,filePath,fileName,data,callback){
	fs.open(filePath+fileName,"w",0644,function(err,fd){//open or create
		if(err) throw err;
		if ((typeof data).toString()==="object") {
			data = JSON.stringify(data);
		}else{
			data = data.toString();
		}
		fs.write(fd,data,0,"utf8",function(err){
			if(err) throw err;
			callback&&callback(fs,filePath,fileName,data);
			fs.closeSync(fd);
		})
	})
}

fs.readFile(basePath+bookPath+fileName,
	{
		encoding:"utf8",
		flag :"r"
	},
	function(err,fileData){
		if(err){
			throw err;
		}
		var chapters = fileData.toString().split(/\n[\s　]+[0-9]{1,2}[\．\.]/);
		var perChapter;
		var newfileName;
		var Length = chapters.length;
		// console.log(chapters[1]);
		for(var i =1;i<Length;i+=1){
			perChapter = chapters[i];
			newfileName = perChapter.split("\n")[0];
			newfileName = ("Chapter" +i+" "+newfileName).trim();
			console.log(newfileName);
			writeFile(fs,basePath+bookPath+"Chapter/",newfileName+".md","### Chapter" +i+" "+perChapter);
		}
	});