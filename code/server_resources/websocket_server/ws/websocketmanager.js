const uuidv4 = require('uuid/v4');
const ConnectionObject = require('./connectionobject');
const instmsgmanager = require('./instmsgmanager');

function WebSocketManager(){
	var _this = this;
	this.connections = {};
	
	//event methods
	this.onMessage = function(message){
		console.log("websocket onMessage", message);
		try{
			var messageObject = JSON.parse(message);
		} catch(error){
			console.log("onmessage json parse error")
		}
		
		if(!messageObject.action){
			console.log("message has no action");
			return;
		}
		
		var action = messageObject.action;
		console.log("message action is ", action)
		if(!_this.actionMethods[action]){
			console.log("message action does not exist");
			return;
		}
		_this.actionMethods[action](messageObject.data);
	}

	//action methods
	this.actionMethods = {};
	this.actionMethods.sendInstantMessage = function(params){
		console.log("send instant message action", params);
	}
	
	//methods
	this.initiateConnection = function(connection){
		console.log("initiate websocket connection");
		do{//prevent conflict
			var token = uuidv4();
		}while(_this.connections[token]);
		//store in memory
		var connectionObject = new ConnectionObject(connection, null);
		_this.connections[token] = connectionObject;
		//send to user
		connectionObject.sendMessage("initiateConnection", {
			connectionToken: token
		});
	};
	
	//getters
	this.getConnection = function(connectionId){
		if(!_this.connections[connectionId]){
			console.log("no active websocket connections with id: " + connectionId);
			return false;
		}
		return _this.connections[connectionId];
	}
}
module.exports = new WebSocketManager();