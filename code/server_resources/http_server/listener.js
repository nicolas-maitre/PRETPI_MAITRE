"use_strict"

const http = require('http');
const url = require('url');
const filesmanager = require("./fs/filesmanager");
const api = require("./api/apiEndpoint");

var server = http.createServer(onRequest);
server.listen(80);
console.log("http server started");

function onRequest(request, result){
	console.log("[" + (new Date(Date.now())).toDateString() + "] request received from: " + request.connection.remoteAddress);
	var parsedUrl = url.parse(request.url);
	//console.log("parsedUrl", parsedUrl);
	var pathArray = parsedUrl.pathname.split("/");
	var endpoint = pathArray[1];
	switch(endpoint){
		case 'api':
			api.onRequest(parsedUrl);
		break;
		case 'imagesApi':
			console.log("images api call");
		break;
		default:
			console.log("filesmanager call");
			filesmanager.onRequest(parsedUrl, function(error, data){
				returnRequest(result, error, data);
			});
		break;
	}
}

function returnRequest(reqres, error, data){
	if(error){
		console.log("ERROR", error);
		reqres.statusCode = 500;
		var endstring = "<h1>Erreur 500</h1><br/>";
		if(error.clientMsg){
			endstring += clientMsg;
		}else{
			endstring += "internal server error";
		}
		reqres.end(endstring);
		return;
	}
	reqres.statusCode = 200;
	reqres.end(data);
}
