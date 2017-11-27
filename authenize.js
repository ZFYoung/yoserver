var usrsys = require('./usermanager')
var http = require('http')
var querystring = require('querystring')
var url = require('url')

var server = http.createServer(function(req,res){

	var pathname = url.parse(req.url).pathname;
	console.log(pathname)

	if (pathname == '/postlogin') {
		var postData = '';
		req.on('data',function(chunk){
			postData += chunk;
		});
		
		req.on('end',function(){
			console.log('receive login data ===========' +postData);
			
			var req_usr = querystring.parse(postData);
			if(postData && postData.indexOf('&')<0){
				req_usr = JSON.parse(postData);
			}

			if (req_usr.uid.length > 0 && req_usr.upwd.length > 0) {
				usrsys.checkUser(req_usr.uid,req_usr.upwd,function(result){
					console.log('auth result ===========' + result);
					if (result === true) {
						res.writeHead(200,{'Content-Type':'application/json'});
						usrsys.getUser(parseInt(req_usr.uid),function(user){
							if (user) {
								res.write(JSON.stringify({'retCode':'1',"USER":JSON.stringify(user)}));
								res.end();
							};
						});

					} else {
						res.writeHead(200,{'Content-Type':'application/json'});
						res.write(JSON.stringify({'retCode':'1'}));
						res.end();
					}
				})
			} else {
				res.writeHead(200,{'Content-Type':'application/json'});
				res.write(JSON.stringify({'retCode':'1'}));
				res.end();
			}
		});
	}
}).listen(3000);


