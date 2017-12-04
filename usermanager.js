var fs = require('fs')
var path = require('path')
var mongo = require('./mongoManager')

var collection = 'usertb'

var getAllUsers = function(callback){

	mongo.selectData(collection, function(result){
		callback(result);
	})
}

var checkUser = function(uname, upwd, callback){

	var condition = {'username':uname, 'userpwd':upwd};
	mongo.selectDataWithCondition(collection, condition, function(result) {
		if (result.length > 0) {
			callback(true, result[0])
		} else {
			callback(false, null)
		}
	})
};

var getUserWithId = function(uid,callback){

	var condition = {'_id':uid};
	mongo.selectDataWithCondition(collection, condition, function(result) {
		callback(result);
	})
}

var createNewUser = function(uname, upwd, uavatar, uoneword, callback) {
	checkUser(uname, upwd, function(result,users) {
		console.log(users)
		if (!users) {
			var dataUser = {"username":uname, "userpwd":upwd, "useravatar":uavatar, "useroneword":uoneword}
			mongo.insertData(collection, dataUser, function(result){
				console.log('插入成功')
				callback(true,'成功');
			})
		} else {
			console.log('插入失败')
			callback(false,'用户已存在');
		}
	})
}

var deleteUser = function(uname, upwd, callback){

	var condition = {'username':uname, 'userpwd':upwd};
	mongo.deleteData(collection, condition, function(result) {
		if (result.length > 0) {
			callback(true,)
		} else {
			callback(false)
		}
	})
};

exports.checkUser = checkUser;
exports.getUserWithId = getUserWithId;
exports.getAllUsers = getAllUsers;
exports.createNewUser = createNewUser;
