var MongoClient = require('mongodb').MongoClient;

var DB_CONN_STR = 'mongodb://localhost:27017/yoserverdb'
var currDB = '';

var connectToDB = function(){
	MongoClient.connect(DB_CONN_STR,function(err,db){
		if (err) {
			console.log('databse connect failed! ===========');
			return;
		}

		currDB = db;
	})
}

var selectData = function(collection, callback){
	var collection = currDB.collection(collection);

	collection.find().toArray(function(err, result){
		if (err) {
			console.log('select data error =======');
			return;
		}
		callback(result);
	})
}

var selectDataWithCondition = function(collection, condition, callback) {
	var collection = currDB.collection(collection);
	collection.find(condition).toArray(function(err, result){
		if (err) {
			console.log('select data error for condition===========' + condition);
			return;
		}
		callback(result);
	})
}

var insertData = function(collection, data, callback){
	var collection = currDB.collection(collection);
	collection.insert(data, function(err, result) {
		if (err) {
			console.log('insert data error ========');
			return;
		}
		callback(result);
	})
}

var insertManyData = function(collection, datalist, callback){
	var collection = currDB.collection(collection);
	collection.insertManyData(datalist, function(err, result){
		if (err) {
			console.log('insert datalist error ===========')
			return;
		}
		callback(result);
	})
}

var updateData = function(collection, condition, data, callback) {
	var collection = currDB.collection(collection);

	var updateStr = {$set:data};
	collection.update(condition, updateStr, function(err, result){
		if (err) {
			console.log('update data error =========' + condition)
			return;
		}
		callback(result)
	})
}

var deleteData = function(collection, condition, callback){
	var collection = currDB.collection(collection);
	collection.delete(condition, function(err, result) {
		if (err) {
			console.log('delete error ==========' + condition);
			return;
		}
		callback(result);
	})
}

connectToDB();

exports.selectData = selectData;
exports.selectDataWithCondition = selectDataWithCondition;
exports.insertData = insertData;
exports.insertManyData = insertManyData;
exports.updateData = updateData;
exports.deleteData = deleteData;
