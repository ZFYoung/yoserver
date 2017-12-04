var usermanager = require('./usermanager')
var http = require('http')
var querystring = require('querystring')
var url = require('url');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req,res){

	var pathname = url.parse(req.url).pathname;

	var postData = '';
	req.on('data',function(chunk){
		postData += chunk;
	});
	
	req.on('end',function(){
		console.log('receive path====== ' + pathname + ' ======data ===========' +postData);
		

		var postDataModel = '';
		if (req.method == "GET") {
			var getquery = url.parse(req.url).query;
			postDataModel = querystring.parse(getquery);
		}
		else if(postData && postData.indexOf('&') < 0) {
			postDataModel = JSON.parse(postData);
		}


		if (pathname == '/postlogin') {
			if (postDataModel.uname.length > 0 && postDataModel.upwd.length > 0) {
				usermanager.checkUser(postDataModel.uname,postDataModel.upwd,function(result, respUser){
					console.log('auth result ===========' + result);
					if (result === true) {
						res.writeHead(200,{'Content-Type':'text/plain'});
						res.write(JSON.stringify({'retCode':'1',"USER":JSON.stringify(respUser)}));
						res.end();
					} else {
						res.writeHead(200,{'Content-Type':'text/plain'});
						res.write(JSON.stringify({'retCode':'0','USER':""}));
						res.end();
					}
				})
			} else {
				res.writeHead(200,{'Content-Type':'text/plain'});
				res.write(JSON.stringify({'retCode':'0','USER':""}));
				res.end();
			}
		} else if(pathname == '/getallusers') {
			usermanager.getAllUsers(function(allusers){
				res.writeHead(200,{'Content-Type':'text/plain'});
				res.write(JSON.stringify({'retCode':'1',"ALLUSERS":JSON.stringify(allusers)}));
				res.end();
			})
		} else if(pathname == '/postregister') {
			usermanager.createNewUser(postDataModel.username,postDataModel.userpwd,postDataModel.useravatar,postDataModel.useroneword,function(result, msg){
				res.writeHead(200,{'Content-Type':'text/plain'});
				res.write(JSON.stringify({'retCode':'0','message':msg}));
				res.end();		
			})
		} else if(pathname == 'getdeleteuser') {
			if (postDataModel.uname.length > 0 && postDataModel.upwd.length > 0) {
				usermanager.deleteUser(postDataModel.uname,postDataModel.upwd,function(result){
					if (result === true) {
						res.writeHead(200,{'Content-Type':'text/plain'});
						res.write('删除成功');
						res.end();
					} else {
						res.writeHead(200,{'Content-Type':'text/plain'});
						res.write('删除失败');
						res.end();
					}
				})
			} else {
				res.writeHead(200,{'Content-Type':'text/plain'});
				res.write('删除失败，账号密码有误！');
				res.end();
			}
		}
		else {
			var realpath = path.join(__dirname,'WWW',pathname)
			fs.readFile(realpath, 'binary', function(err, file) {
				if (err) {
					res.writeHead(500,{'Content-Type':'text/plain'});
					res.end();
				} else {
					res.writeHead(200,{'Content-Type':'text/html'});
					res.write(file, 'binary');
					res.end();
				}
			})
		}
	});
}).listen(3000);


