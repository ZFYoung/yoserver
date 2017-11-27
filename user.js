
function User(){
	this.uid = -1;
	this.name = '';
	this.pwd = ''
	this.avatar = ''
	this.age = ''
}

function checkUser(user){
	if (user.uid === self.uid && user.pwd === self.pwd) {
		return ture;
	}else{
		return false;
	}
}

exports.User = User;
exports.checkUser = checkUser;