function Actions(){
	this.sendInstantMessage = function(input){
		if(!input.value){
			console.log("input is empty");
			return;
		}
		
		wsManager.sendMessage("sendInstantMessage", {text:input.value});
		
		input.value = "";
	}
}