var CN2Pinyin = require("./CN2Pinyin.js").transform;
var fs = require("fs");
var collection  =require("./mongodb.js").collection.init({
	collection:"CET4.1",
	aycnTime:300
});
var template =function (){/*
<snippet>
    <content><![CDATA[{{0}}]]></content>
    <tabTrigger>{{1}}</tabTrigger>
    <description>{{2}}</description>
</snippet>
*/}

function saveData (per,num,data) {
	fireContent = templateStr.replace("{{0}}",per.name).replace("{{1}}",CN2Pinyin(per.chinese)).replace("{{2}}",per.chinese+"-"+per.name);
	// console.log(fireContent);
	writeFile(fs,"res/sublime-zh2en/",per.name+".sublime-snippet",fireContent,function(fs,filePath,fileName,data){
		console.log(fileName+" write succeed!!");
	})
};

var templateStr = template.toString().replace("function (){/*","").replace("*/}","");
collection.find({},function(err,data){
	console.log(data.length);
	var per;
	var fireContent;
	for(var i = 0;i<data.length;i+=1){
		per = data[i];
		saveData(per,i,data);
	}
	collection.close();
});

function writeFile(fs,filePath,fileName,data,callback){
	fs.open(filePath+fileName,"w",0644,function(err,fd){//open or create
		if(err) {
			// console.log(data);
			console.log(err.message+"rewrite "+fileName);
			writeFile(fs,filePath,fileName,data,callback);//出错，重写
			return false;
			throw err;
		}
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