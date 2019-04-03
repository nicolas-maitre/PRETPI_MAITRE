function Actions(){
	this.sendInstantMessage = function(input){
		if(!input.value){
			console.log("input is empty");
			return;
		}
		var messageObject = {
			groupId: messagingActions.currentGroup,
			text: input.value
		}
		wsManager.sendMessage("addMessage", messageObject);
		input.value = "";
	}
}