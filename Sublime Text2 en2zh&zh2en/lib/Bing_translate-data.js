var baseUrl = "http://www.microsofttranslator.com/dictionary.ashx";
var data = {
	"from":"en",
	"to":"zh-chs",
	"text":"",
	"oncomplete":""
};
var Get = require("./Get.js").Get;

function onDictComplete (data,callback,word) {
	// console.log(data);
	var lines = data.split('<br />')
	var formatData = [],
		line,
		sense,

		i,
		explanation
		;

	for(i = 0;i<lines.length;i+=1){
		line = lines[i];
		if (line.indexOf('</span>')!==-1) {//类别头
			formatData.push({
				type:line.replace('<span class="dictB">','').replace('</span>',''),
				sense:[]
			});
			sense = formatData[formatData.length-1].sense;
		}else{
			try{
				sense.push(line);
			}catch(e){
				word = line;
			}
		}
	}
	callback&&callback(formatData,word);
}
exports.translate = function(word,callback){
	data.text = word;
	Get({
		url:baseUrl,
		data:data,
		endFun:function(data){
			var decode = data.substring(21,data.length-4);
			onDictComplete(decodeURIComponent(decode),callback,word);
		}
	})
}