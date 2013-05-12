var Bing = require("./Bing_translate-data.js").translate;
var Google = require("./Google_translate-data.js").translate;
var fs = require("fs");
// var collection  =require("./mongodb.js").collection.init({
// 	collection:"CET4",
// 	aycnTime:300
// });

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
		fs.readFile("res/DATA-CET4-en.2.res",
		{
			encoding:"utf8",
			flag :"r"
		},function(err,filterData){
			if(err){
				throw err;
			}
			var filterWords = filterData.split("\r\n");
			var words = "|"+fileData.split("\r\n").join("|")+"|";
			var word;
			var Length = filterWords.length;//100;//
			var replaceStr;
			for (var i = 0; i < Length; i+=1) {
				replaceStr = "|"+filterWords[i]+"|";
				words = words.replace(replaceStr,"|");
			};
			console.log(words.split("|").join("\n"));
		});
	});
