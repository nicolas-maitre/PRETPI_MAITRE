const uuidv4 = require('uuid/v4');
function TokensManager(){
	this.generateToken = function(type){
		var token = uuidv4();
	}
}
module.exports = new  TokensManager();