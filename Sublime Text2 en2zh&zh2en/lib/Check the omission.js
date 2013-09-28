var Bing = require("./Bing_translate-data.js").translate;
var Google = require("./Google_translate-data.js").translate;
var fs = require("fs");
var collection  =require("./mongodb.js").collection.init({
	collection:"CET4",
	aycnTime:300
});

// Bing("absorb",function(data) {
// 	console.log("+Bing");
// 	console.log(data);
// 	console.log("-Bing");
// });

// Google("absorb",function(data) {
// 	console.log("+Google");
// 	console.log(JSON.stringify(data));
// 	console.log("-Google");
// });
var CET4FILEPATH = "res/CET4/";

fs.readFile("res/DATA-CET4-en.res",
	{
		encoding:"utf8",
		flag :"r"
	},
	function(err,fileData){
		if(err){
			throw err;
		}
		var words = fileData.split("\r\n");
		var wordsBak = "|"+fileData.split("\r\n").join("|")+"|";
		var word;
		var Length = words.length;//100;//
		var replaceStr;
		// console.log(wordsBak);
		collection.find({collection:"CET4"},function(result,data){
			for(var j= 0;j<data.length;j+=1){
				replaceStr = "|"+data[j].name+"|";
				wordsBak = wordsBak.replace(replaceStr,"|");
			}
			console.log(wordsBak);
			collection.close();
		})
	});

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

// collection.find({},function(result,data){
// 	console.log(data)
// })


	// (function(word){
	// 			Bing(word,function(bingData,baseWord) {
	// 				Google(word,function(googleData) {
	// 					var writeFileData = {
	// 						name:word,
	// 						base:baseWord,
	// 						mean:bingData,
	// 						synonyms:googleData
	// 					};
	// 					console.log(word+" get succeed!!")
	// 					// writeFile(fs,CET4FILEPATH,word+".json.res",writeFileData,function(fs,filePath,fileName,data){console.log(fileName+" write succeed!!")});
	// 					// // console.log(collection);
	// 					// collection.insert({data:writeFileData},function(){
	// 					// 	collection.find({},function(result,data){
	// 					// 		console.log(data);
	// 					// 		collection.close();
	// 					// 	})
	// 					// });
	// 				});
	// 			});}
	// 		("alloy"));