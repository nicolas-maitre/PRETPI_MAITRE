"use strict";
const database = require('../../classes/databasemanager');
const rights = require('../../classes/rightsmanager');
function InstantMessagingManager(){
	this.addMessage = function(params){
		console.log("add message", params);
		if(!rights.isAllowed(params.auth, "addMessage", params.data)){
			console.log("user is not allowed");
			return;
		}
		
		var messageData = params.data;
		//store message
		database.insertInto("messages", {
			id: "UUID()",
			groups_id: messageData.groupId,
			users_id: params.auth.id,
			text: messageData.text,
			creation_time: "CURRENT_TIMESTAMP()"
		},{
			directFields:{id:true, creation_time:true}
		}, function(error, result){
			if(error){
				console.log("add message in db error:", error);
				return;
			}
			console.log("add message in db sucess!");
			notifyGroup(messageData.groupId);
		});
	};
	function notifyGroup(groupId, message){
		//get group
		database.select({
			fields: "users_id",
			tableName: "user_groups",
			where: "groups_id = ?",
			data: [groupId]
		}, function(error = false, result = false){
			if(error){
				console.log("notifyGroup select error:", error);
				return;
			}
			console.log("notifyGroup select success: ", result);
		});
	}
}
module.exports = new InstantMessagingManager();