var fs = require('fs')
var path = require('path')
var mongo = require('./mongoManager')

var usrdbpath = path.join(__dirname,'testdata/testuser.txt')
var getAllUsers = function(callback){

	mongo.selectData('usertb', function(result){
		callback(result);
	})
}

var checkUser = function(uname, upwd, callback){

	var condition = {'username':uname, 'userpwd':upwd};
	mongo.selectDataWithCondition('usertb', condition, function(result) {
		if (result.length > 0) {
			callback(true, result[0])
		} else {
			callback(false, null)
		}
	})
};

var getUserWithId = function(uid,callback){

	var condition = {'_id':uid};
	mongo.selectDataWithCondition('usertb', condition, function(result) {
		callback(result);
	})
}

exports.checkUser = checkUser;
exports.getUserWithId = getUserWithId;
exports.getAllUsers = getAllUsers;
