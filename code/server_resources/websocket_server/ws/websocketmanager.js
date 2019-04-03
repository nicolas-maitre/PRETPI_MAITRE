const uuidv4 = require('uuid/v4');
const ConnectionObject = require('./connectionobject');
const rights = require('../../classes/rightsmanager');

function WebSocketManager(listenerRef){
	const instmsgmanager = new (require('./instmsgmanager'))(this);
	
	var _this = this;
	this.connections = {};
	this.userConnections = {};
	
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
		_this.actionMethods[action](messageObject);
	}

	//action methods
	this.actionMethods = {};
	this.actionMethods.addMessage = instmsgmanager.addMessage;
	this.actionMethods.linkUserToConnection = function(params){
		console.log("link user to connection", params);
		if(!rights.isAllowed(params.auth, "linkUserToWs", params.data)){
			console.log("user is not allowed to link himself");
			return;
		}
		_this.userConnections[params.data.userId] = params.wsToken;
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
	
	this.sendMessageToUser = function(userId, action, messageObject){
		var connection = _this.getConnection(userId);
		if(!connection){
			console.log("sendMessage error: no connection for user", userId);
			return;
		}
		connection.sendMessage(action, messageObject);
	};
	//getters
	this.getConnection = function(userId){
		if(!_this.userConnections[userId]){
			console.log("no active ws connection for user", userId);
			return false;
		}
		var connectionId = _this.userConnections[userId];
		if(!_this.connections[connectionId]){
			console.log("no active websocket connections with id: " + connectionId);
			return false;
		}
		return _this.connections[connectionId];
	}
}
module.exports = new WebSocketManager;