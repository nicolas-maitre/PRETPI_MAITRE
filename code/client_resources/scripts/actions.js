"use strict";
/*
project: Messaging Web App
description: contains actions from events assigned in the page 
author: Nicolas Maitre
version: 03.04.2019
*/
function Actions(){
	//takes the input value and sends a message to selected group
	this.sendInstantMessage = function(input){
		if(!input.value){
			console.log("input is empty");
			return;
		}
		var messageObject = {
			groupId: messagingActions.currentGroup,
			text: input.value
		}
		//send message to websocket
		wsManager.sendMessage("addMessage", messageObject);
		//clear input
		input.value = "";
	}
}