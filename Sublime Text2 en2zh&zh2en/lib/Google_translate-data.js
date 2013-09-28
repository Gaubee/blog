//Google translate 用于抓取近义词以及其近义词频率
var Get = require("./Get.js").Get;
var baseUrl_zhServer = "https://translate.google.cn/translate_a/t";//国内服务器
var baseUrl = "http://translate.google.com.tw/translate_a/t";//国外服务器
var data = {
	client:"t",
	hl:"en",
	sl:"en",
	tl:"zh-CN",
	ie:"UTF-8",
	oe:"UTF-8",
	multires:"1",
	oc:"1",
	otf:"1",
	ssel:"3",
	tsel:"0",
	sc:"1",
	"q":"None"
};
function onDictComplete (data,callback) {
	// console.log(data);
	var formatData = [],
		synonyms = data[1],
		syno,
		i
		;

	if(synonyms&&synonyms.length){
		for(i=0;i<synonyms.length;i+=1){
			syno = synonyms[i];
			formatData.push({
				type:syno[0],
				synonyms:syno[2].map(function(item,j){
					return {
						"zh-CN":item[0],
						"keys":item[1],
						"frequency":item[3]
					};
				})
			})
		}
	}

	callback&&callback(formatData,data[0][0]);
}
exports.translate = function(word,callback){
	data.q = word;
	Get({
		url:baseUrl,
		data:data,
		endFun:function(arrData) {
			// console.log(arrData);
			try{
				var executeData = eval(arrData);
				onDictComplete(executeData,callback);
			}catch(e){
				translate_zhServer(word,callback);
			}
		},
		errFun:function(err){
			console.log(err+" reGet");
			translate_zhServer(word,callback);
		}
	})
}


function translate_zhServer (word,callbac) {
	data.q = word;
	Get({
		url:baseUrl_zhServer,
		data:data,
		endFun:function(arrData) {
			// console.log(arrData);
			try{
				var executeData = eval(arrData);
				onDictComplete(executeData,callback);
			}catch(e){
				exports.translate(word,callback);
			}
		},
		errFun:function(err) {
			console.log(err+" reGet");
			exports.translate(word,callback);
		}
	})
}
// exports.translate("translate",function(data){
// 	console.log(data)
// })
