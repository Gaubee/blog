var Net = {
	https : require('https'),
	http : require('http')
}
var qs=require('querystring');
var url=require('url');
var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');
var bufferHelper = new BufferHelper();
var html = "";
var PostData = function(opctions){//{onFun,endFun,errFun}
	var post_data = qs.stringify(opctions.data)

	var baseURL = opctions.url;
	var getURL = url.parse(baseURL);
	console.log(baseURL);
	getURL.method = "POST";
	getURL.headers={
		'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.65 Safari/537.36",
		'Content-Type':'application/x-www-form-urlencoded',
		'Content-Length':post_data.length,
		'Cookie':opctions.cookie||''
	};
	// console.log(baseURL);
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
	// getURL.port=opctions.port||80;
	// console.log(getURL);
	var req = Net[getURL.protocol.replace(":","")].request(getURL, function (res) {
		// res.setEncoding('utf-8');

		res.on('data',onFun).on('end',endFun)
	}).on('error',errFun);

	req.write(post_data);

	req.end();
	
	return req;
};
exports.Post = PostData;
