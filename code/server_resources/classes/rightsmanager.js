function RightsManager(){
	this.isAllowed = function(authObject, action, params){
		return true;
	}
}
module.exports = new RightsManager();