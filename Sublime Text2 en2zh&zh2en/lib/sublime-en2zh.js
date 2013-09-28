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
	fireContent = [per.name,per.chinese+"["+per.pinyin+"]"].concat("\n","___","详细解释：","___");
	fireContent = fireContent.concat( per.mean.map(function(item,n,self){
					return ["【"+item.type+"】"].concat(item.sense).join("\n\t");
				})).concat("\n","___","近义词：","___").concat(per.synonyms.map(function(item,n,self){
					return ["【"+item.type+"】"].concat(item.synonyms.map(function(synonyms){
						return "	"+synonyms["zh-CN"]+"："+synonyms.keys.join();
					})).join("\n")
				})).join("\n")
	fireContent = templateStr.replace("{{0}}",fireContent).replace("{{1}}",per.name).replace("{{2}}",per.chinese);
	// console.log(fireContent);
	writeFile(fs,"res/sublime-en2zh/",per.name+".sublime-snippet",fireContent,function(fs,filePath,fileName,data){
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
	};
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