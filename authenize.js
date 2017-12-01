var usermanager = require('./usermanager')
var http = require('http')
var querystring = require('querystring')
var url = require('url')

var server = http.createServer(function(req,res){

	var pathname = url.parse(req.url).pathname;

	if (pathname == '/postlogin') {
		var postData = '';
		req.on('data',function(chunk){
			postData += chunk;
		});
		
		req.on('end',function(){
			console.log('receive path====== ' + pathname + ' ======data ===========' +postData);
			
			var requser = querystring.parse(postData);
			if(postData && postData.indexOf('&') < 0) {
				requser = JSON.parse(postData);
			} else {
				requser = querystring.parse(postData);
			}

			if (requser.uname.length > 0 && requser.upwd.length > 0) {
				usermanager.checkUser(requser.uname,requser.upwd,function(result, respUser){
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
		});
	} else if(pathname == '/getallusers') {
		usermanager.getAllUsers(function(allusers){
			res.writeHead(200,{'Content-Type':'text/plain'});
			res.write(JSON.stringify({'retCode':'1',"ALLUSERS":JSON.stringify(allusers)}));
			res.end();
		})
	}
}).listen(3000);


