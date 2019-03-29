var globalSpace = {};
var groups = {};

//classes
var builder = new Builder();
var pagesManager = new PagesManager();
var wsManager = new WebSocketManager();
var actions = new Actions();
var messagingActions = new MessagingActions();

//start by history
var pageName = "mwa"; //default
if(!NOSERVER_ENV){
	var pageFromUrl = window.location.pathname.split("/")[1];
	if(pageFromUrl){
		pageName = pageFromUrl;
	}
}
pagesManager.changePage(pageName, {isPopState:/*server false, noserver true*/NOSERVER_ENV});

//history popstate
window.addEventListener("popstate", function(evt){
	if(evt.state.pageName){
		pagesManager.changePage(evt.state.pageName, {isPopState:true});
	}
});

//dev tests
