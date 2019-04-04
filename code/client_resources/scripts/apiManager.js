"use strict";
const validUrl = "http://192.168.1.110"; //"http://nmaitre.internet-box.ch" used for dev purposes, fixes an issue with dynDNS
/*
project: Messaging Web App
description: contains function used to interact with the api
author: Nicolas Maitre
version: 03.04.2019
*/
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
		
		//test hc
		var testGroup = {
			id: options.groupId,
			name: "Nicolas Maitre, Nicolas Glassey",
			type: "single",
			image: "testFileId"
		}
		callBack(false, testGroup);
	}
	this.get.messages = function(options, callBack){
		//{groupId, start, count}
		callApi("get", "messages", {params:options}, function(error = false, result = false){
			if(error){
				callBack(error);
				return;
			}
			callBack(false, result);
		});
	}
	
	//get user's infos, is currently hardcoded
	this.get.user = function(options, callBack){ 
		//{userId}
		var HCUsers = { //Hardcoded users
			'bb686737-5080-11e9-809c-b827eb4f1633': {
				id: 'bb686737-5080-11e9-809c-b827eb4f1633',
				first_name: 'Nicolas',
				last_name: 'Maitre',
				pseudo: 'nmaitre'
			},
			'f319ca59-5080-11e9-809c-b827eb4f1633': {
				id: 'f319ca59-5080-11e9-809c-b827eb4f1633',
				first_name: 'Nicolas',
				last_name: 'Glassey',
				pseudo: 'nglassey'
			}
		}
		if(!HCUsers[options.userId]){
			console.log("user doesn't exist");
			callBack("user unknown");
			return;
		}
		callBack(false, HCUsers[options.userId]);
	}
	/*set*/
	this.set = {};
	
	/*method*/
	this.callApi = function(action, item, options = {}, callBack = function(){}){
		//build url
		var fetchUrl = validUrl + "/api";
		fetchUrl += "/" + action;
		fetchUrl += "/" + item;
		if(options.params){ //build params
			fetchUrl += "/?" + JSON.stringify(options);
		}
		//make request
		fetch(fetchUrl).then(function(response){
			console.log("fetch response", response);
		});/*.then(function(){
			
		});*/
	};
}