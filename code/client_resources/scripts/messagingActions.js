function MessagingActions(){
	var _this = this;
	this.currentGroup = "0000-0000-0000-0000-0000";
	this.groups = {
		
	};
	
	this.displayMessages = function(dataArray, options){
		
	}
	this.displayNewMessage = function(data, options){
		console.log("displayNewMessage data", data);
		
		//temp before api, fixed div
		if(!_this.groups[_this.currentGroup]){
			_this.groups[_this.currentGroup] = {};
			_this.groups[_this.currentGroup].msgContainer = pagesManager.getCurrentPage().elements.rightPanel.msgSection.addElement('div', 'groupMessageSection');
		}
		var container = _this.groups[_this.currentGroup].msgContainer;
		
		apiManager.get.user({userId: data.userId}, function(error = false, result){	
			if(error){
				console.log("user error", error);
				return;
			}
			var messageAdapter = builder.buildMessageAdapter(container, {
				userObject: result,
				text: data.text,
				timestamp: data.timestamp
			});
		});
	}
	this.displayGroup = function(groupId){
		if(!_this.groups[groupId]){
			console.log("group is not yet loaded");
			//call the api here
			return;
		}
		
	}
}