var fs = require('fs')
var path = require('path')

var usrdbpath = path.join(__dirname,'testdata/testuser.txt')
var getAllUsers = function(callback){
	fs.stat(usrdbpath,function(err,stats){
		if (err){
			console.log('file path error====' + usrdbpath);
		} else {
			if (stats.isFile()){
				var fileStream = fs.createReadStream(usrdbpath);
				fileStream.on('error',function(err){
					console.log('file read error');
				})
				
				fileStream.on('data',function(data){
					var allusr = data.toString();
					return callback(JSON.parse(allusr));
				})
			}
		}
	})
}

var checkUser = function(uid,upwd,callback){
	getAllUsers(function(allusrModel){
		if (allusrModel.length <= 0) {
			return callback(false);
		} 
		
		for (var i = allusrModel.length-1; i >= 0; i--){
			var usr = allusrModel[i];
			if (usr.USERID == uid && usr.USERPWD == upwd){
				console.log('login succeed');
				return callback(true);
			}
		}
		return callback(false);
	});
};

var getUser = function(uid,callback){
	if (uid > 0){
		getAllUsers(function(allusrModel){
			if (allusrModel.length <= 0) {
				return callback(null);
			} 
			
			for (var i = allusrModel.length-1; i >= 0; i--){
				var usr = allusrModel[i];
				if (usr.USERID == uid){
					console.log('catch user success');
					return callback(usr);
				}
			}
			return callback(null);
		})
	};
}

exports.checkUser = checkUser;
exports.getUser = getUser;
exports.getAllUsers = getAllUsers;
