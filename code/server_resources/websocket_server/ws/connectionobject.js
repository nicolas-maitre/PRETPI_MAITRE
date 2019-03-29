function ConnectionObject(connection={}, user={}){
	var _this = this;
	
	this.connection = {};
	this.user = {};
	
	/*methods*/
	this.sendMessage = function(action="", params={}, options={}){
		console.log("connection object send message");
		if(!_this.connection.sendUTF){
			console.log("connection object has no connection", _this.connection);
			return;
		}
		_this.connection.sendUTF(JSON.stringify({
			action:action,
			options:params
		}));
	};
	
	/*init*/
	(function(){
		_this.connection = connection;
		_this.user = user;
	})();
}
module.exports = ConnectionObject;