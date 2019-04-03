function ApiEndpoint(){
	this.onRequest = function(urlObj){
		console.log("onRequest api", urlObj);
	};
}
module.exports = new ApiEndpoint();