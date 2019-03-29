function ApiManager(){
	/*init*/
	(function(){})();
	/*get*/
	this.get = {};
	this.get.groups = function(options, callBack){
		//{start, count}
	}
	this.get.group = function(options, callBack){
		//{groupId}
		
		//test
		var testGroup = {
			id: options.groupId,
			name: "",
			type: "single",
			image: "testFileId"
		}
		callBack(false, testGroup);
	}
	this.get.messages = function(options, callBack){
		//{groupId, start, count}
	}
	/*set*/
	this.set = {};
}