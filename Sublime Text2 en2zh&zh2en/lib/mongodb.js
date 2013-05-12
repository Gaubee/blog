var mongodb = require("mongodb"),
	Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server,
	format = require('util').format
	;
// //console.log=function(){};
var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

//console.log("Connecting to " + host + ":" + port);
var client = new mongodb.Db("English-beat",new mongodb.Server(host,port,{}));
// function(err,collection){
// 	collection.insert([{name:"bangeel",age:"22"},{name:"???",age:"140"}]);
// 	collection.remove();
// 	//console.log(
// 		collection.find().toArray(function(err,item){
// 			if(err){
// 				throw err;
// 			}
// 			//console.log(item);
// 		})
// 	);
// }
function openMongo(callback){
	// client.close();
	client.open(function(err,db){
		if(err){
			collection.openDb = 0;
			throw err;
		}
		//console.log("mongodb link open!");
		callback&&callback(db);
	});
}
var openningTi,
	openningFunBuffer = []
function operateMongo(collection_name,callback){
	if (collection.openDb === 2) {
		//console.log("mongodb link opened!");
		client.collection(collection_name,callback);
	}else if(collection.openDb === 1){
		openningFunBuffer.push({
			"collection":collection_name,
			"callback":callback
		});
		clearInterval(openningTi);
		openningTi = setInterval(function(){
			//console.log("witting openning!");
			if(collection.openDb===2){
				for(var i = 0 ;i<openningFunBuffer.length;i+=1){
					client.collection(openningFunBuffer[i].collection,openningFunBuffer[i].callback);
				}
				clearInterval(openningTi);
			}
		},100);
	}else{
		collection.openDb = 1;
		//console.log("mongodb link opening...");
		openMongo(function(){
			collection.openDb = 2;
			client.collection(collection_name,callback);
		});
	}
}
var Ti;
var dataBuffer = [];
function collectionInsert(data,collection_name,callback){
	operateMongo(collection_name,function(err,collection){
		if (err) {throw err;}
		//console.log("insert data!!");
		//console.log(data);
		collection.insert(data,callback);
		// callback&&callback();
	})
}
function collectionFind(data,collection_name,callback){
	operateMongo(collection_name,function(err,collection){
		if (err) {throw err;}
		var result = collection.find(data);
		result.toArray(function(err,item){
			//console.log("find end!");
			callback&&callback(err,item,result);
		})
		
	})
}
var collection = {
	collection:"DEFAULT_COLLECTION",
	aycnTime:100,
	_dbopend:false,
	openDb:0,//-1:closing0:closed,1:openning,2:opened
	init:function(opction){
		var self = this;
		self.collection = opction.collection||self.collection;
		self.aycnTime = opction.aycnTime||self.aycnTime;
		return self;
	},
	// openMongo:openMongo,
	insert:function(opction,callback){
		//opction={collection_name/sync/aycnTime}
		//callback(err,collection,)
		var self = this;
		var data = opction.data;
		var collection_name = opction.collection||self.collection;
		if(opction.sync){
			collectionInsert(data,collection_name,callback);
		}else{
			clearTimeout(Ti);
			dataBuffer = dataBuffer.concat(data);
			Ti = setTimeout(function(){
				collectionInsert(dataBuffer,collection_name,function(){
					callback(dataBuffer);
					dataBuffer = [];
				});
			},opction.aycnTime||self.aycnTime);
		}
	},
	find:function(opction,callback){
		//opction={collection_name/sync/aycnTime}
		//callback(err,collection,)
		var self = this;
		var data = opction.data;
		var collection_name = opction.collection||self.collection;
		// if(opction.sync){
		// 	collectionFind(data,collection_name,callback);
		// }else{
		// 	clearTimeout(Ti);
		// 	dataBuffer.concat(data);
		// 	Ti = setTimeout(function(){
		// 		collectionFind(dataBuffer,collection_name,callback);
		// 		dataBuffer = [];
		// 	},opction.aycnTime||self.aycnTime);
		// }
		collectionFind(data,collection_name,callback);

	},
	close:function(){
		client.close();
		collection.openDb = 0;
		//console.log("mongodb link closed!");
	}
}
;
exports.collection = collection;

//+清空数据
// operateMongo("CET4",function(err,collection){
// 	collection.remove();
// 	collection.find().toArray(function(err,data){
// 		console.log(data.length);
// 		client.close();
// 	})
// });
//-清空数据


//+测试插入数据1
// operateMongo("CET4",function(err,collection){
// 	collection.insert([{name:"bangeel",age:"22"},{name:"???",age:"140"}]);
// 	// collection.remove();
	
// 	collection.find().toArray(function(err,item){
// 		if(err){
// 			throw err;
// 		}
// 		//console.log(item);
// 		client.close();
// 	});
// });
//-测试插入数据1


//+输出所有单词
// collection.find({
// 		collection:"CET4.1"
// 	},
// 	function(err,data){
// 		for(var i=0;i<data.length;i+=1){
// 			console.log(data[i].name);
// 		}
// 		collection.close();
// 	})
//+输出所有单词

//+清空name相同的项
// collection.find({collection:"CET4.1"},function(err,data){
// 	console.log("befor ensureIndex");
// 	console.log(data.length);
// 	operateMongo("CET4.1",function(err,col){
// 		col.ensureIndex({name: 1, nodes: 1}, {unique: true, dropDups: true},function(){
// 				collection.find({collection:"CET4.1"},function(err,data){
// 					console.log("after ensureIndex");
// 					console.log(data.length);
// 					collection.close();
// 				})
// 		}) 
// 	});
// })
//-清空name相同的项

//+测试插入数据2
// collection.insert({
// 		data:[{name:"bangeel",age:"22"},{name:"???",age:"140"}],
// 		collection:"CET6"
// 	},function(){
// 	collection.find({collection:"CET6"},function(err,data){
// 		//console.log("inert ok")
// 		//console.log(data);
// 		collection.close();
// 	})
// })
//-测试插入数据2
