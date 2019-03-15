"use strict"
const http = require('http');
const websocket = require('websocket');

//"http" listener
var httpServer = http.createServer(function(){});
httpServer.listen(1337, function(){})

//websocket server
wsServer = new websocket.server({
	httpServer: httpServer
})
//event
wsServer.on('request', function(req){
	var connection = req.accept(null, req.origin);
	
	//messages
	connection.on('message', function(msg){
		if(message.type != 'utf8'){
			return;
		}
		//process message
	});
	
	//close
	connection.on('close', function(connection){
		
	});
});