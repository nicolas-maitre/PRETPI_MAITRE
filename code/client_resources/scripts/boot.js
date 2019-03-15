var globalSpace = {};
var elements = {};

//classes
var builder = new Builder();
var pagesManager = new PagesManager();
var wsManager = new WebSocketManager();

//start by history
var pageName = "mwa"; //default
var pageFromUrl = window.location.pathname.split("/")[1];
if(pageFromUrl){
	pageName = pageFromUrl;
}
pagesManager.changePage(pageName);

//history popstate
window.addEventListener("popstate", function(evt){
	if(evt.state.pageName){
		pagesManager.changePage(evt.state.pageName, {isPopState:true});
	}
});