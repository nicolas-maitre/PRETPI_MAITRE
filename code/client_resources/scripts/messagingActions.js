"use strict";
/*
project: Messaging Web App
description: contains actions directly linked with messaging
author: Nicolas Maitre
version: 03.04.2019
*/
function MessagingActions(){
	var _this = this;
	this.currentGroup = "0000-0000-0000-0000-0000";
	this.groups = {}; //loaded groups list
	
	// display multiple messages
	this.displayMessages = function(dataArray, options){ 
		console.log("not written yet");
	};
	// displays a new message in a group
	this.displayNewMessage = function(data, options){
		console.log("displayNewMessage data:", data);
		
		//group management before the api is working
		if(!_this.groups[_this.currentGroup]){
			_this.groups[_this.currentGroup] = {};
			_this.groups[_this.currentGroup].msgContainer = pagesManager.getCurrentPage().elements.rightPanel.msgSection.addElement('div', 'groupMessageSection');
		}
		//zone in which the messages are built
		var container = _this.groups[_this.currentGroup].msgContainer;
		
		apiManager.get.user({userId: data.userId}, function(error = false, result){	//calls api (or cache) to determine messager(user) name
			if(error){
				console.log("user error", error);
				return;
			}
			//builds the message element
			var messageAdapter = builder.buildMessageAdapter(container, {
				userObject: result,
				text: data.text,
				timestamp: data.timestamp
			});
		});
	};
	
	//displays a group
	this.displayGroup = function(groupId){
		if(!_this.groups[groupId]){
			console.log("group is not yet loaded");
			//call the api here
			return;
		}
		
	};
}