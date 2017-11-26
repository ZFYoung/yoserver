var net = require('net');

var connLoop = []


var server = net.createServer(function(connect) {
	console.log('Tcp Client have conneced! ++++');

	connect.on('data',function(data){
		callBackSend(data,connect);
	})

	connect.on('end',function(){
		console.log('Client have droped! ++++');
	});
	connect.on('error',function(err){
		console.log(err.stack);
	})

});

function callBackSend(_data,connect){

	var head = _data.slice(0,4);
	var body = _data.slice(4);
	console.log(body.toString())
	var bodyModel = JSON.parse(body.toString());
	createConnectLoop(bodyModel.FROMID,connect);

	getConnection(bodyModel.TOID,function(conn){
		if (conn) {
			sendData(body.toString(),conn);
		};
	})
}

var createConnectLoop = function(connid,connect) {
	if (connLoop[connid] && connLoop[connid].readable) {

	} else {
		connLoop[connid] = connect;
	}
}

var getConnection = function(connid, callback){
	if (connLoop[connid] && connLoop[connid].readable) {
		console.log('message will  send to ======  ' + connid)
		callback(connLoop[connid]);
	}else {
		callback(null);
	}
}

var sendData = function(_data, connect) {
	// var dataString = JSON.stringify(_data);
	var dataString = _data;
	var _buffer = new Buffer(dataString);
	var _fBuffer = new Buffer(4);
	_fBuffer.writeInt32LE(_buffer.length,0,4);
	var _lastBuffer = Buffer.concat([_fBuffer,_buffer]);

	connect.write(_lastBuffer);
}

server.listen(2345,function() {
	console.log('Tcp Server start.....');
});