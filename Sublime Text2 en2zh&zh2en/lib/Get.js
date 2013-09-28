var Net = {
	"https:": require('https'),
	"http:": require('http')
}
var url=require('url');
var html = "";
var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');
var getData = function(opctions){//{onFun,endFun,errFun}
	var bufferHelper = new BufferHelper();
	var baseURL = opctions.url;
	if((typeof opctions.data).toString() === "object"){
		var urlData = opctions.data||{};
		var urlDataFormated = "";
		for(var i in urlData){
			urlDataFormated+="&"+i+"="+urlData[i];
		}
		if (urlData) {
			baseURL+="?"+urlDataFormated.replace("&","");
		};
	}else{
		baseURL += opctions.data;
	}
	var getURL = url.parse(baseURL);
	getURL.headers={
		'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.65 Safari/537.36",
		'Cookie':opctions.cookie||''
	};
	opctions = opctions||{};
	var onFun = opctions.onFun||function (data) {//加载数据,一般会执行多次
			bufferHelper.concat(data);
		};
	var endFunBase = opctions.endFun||function (data) {
			console.log(data);
		};
	var endFun = function(){
			html = iconv.decode(bufferHelper.toBuffer(),opctions.charset||"UTF8")
			endFunBase.call(this,html)
		}
	var errFun = opctions.errFun||function(err) {
			console.log("http get error:",err);
		};
	// console.log(getURL);
	var req = Net[getURL.protocol].get(getURL, function (res) {
		// res.setEncoding('utf8');

		res.on('data',onFun).on('end',endFun)
	}).on('error',errFun);
	return req;
};
exports.Get = getData;
