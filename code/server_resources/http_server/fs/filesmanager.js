"use_strict"

const fs = require("fs");
const querystring = require("querystring");
const CLIENT_RESOURCES_PATH = "/var/git/PRETPI_MAITRE/code/client_resources";

function FilesManager(){
	this.onRequest = function(urlObject, callBack){
		//console.log("urlObject", urlObject);
		var path = "/main.html";
		console.log("exists: ", CLIENT_RESOURCES_PATH + urlObject.pathname);
		if(fs.existsSync(CLIENT_RESOURCES_PATH + urlObject.pathname) 
			&& urlObject.pathname != "/"){
			path = urlObject.pathname;
		}
		getFileFromWebsitePath(path, callBack);
	}
	function getFileFromWebsitePath(path, callBack){
		fs.readFile(CLIENT_RESOURCES_PATH + path, function(error, data){
			callBack(error, data);
		});
	}
}
module.exports = new FilesManager();