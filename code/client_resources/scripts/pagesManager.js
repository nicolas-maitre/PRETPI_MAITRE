"use strict";
/*
project: Messaging Web App
description: manages the page building framework
author: Nicolas Maitre
version: 03.04.2019
*/
function PagesManager(){
	var _this = this;
	this.pages = {};
	this.currentPage = ""; //default page
	
	//change current page to page name
	this.changePage = function(pageName, options = {}){
		console.log("change page from " + _this.currentPage + " to " + pageName);
		if(_this.currentPage == pageName){ //page already shown
			console.log("page already shown");
			return false;
		}
		if(!pagesConfig[pageName]){//non existant page (in structure)
			console.log("this page doesn't exist");
			return false;
		}
		var currentPageStructure = pagesConfig[pageName]; //get page config
		if(_this.currentPage){//hide current page
			_this.pages[_this.currentPage].domElement.classList.add('none');
		}
		
		//add new page to history
		if(!options.isPopState && !NOSERVER_ENV){
			history.pushState({pageName:pageName}, "Messaging Web App", "/" + pageName);
		}
		
		//page title (document)
		document.title = "Messaging Web App - " + pageName;
		
		_this.currentPage = pageName;
		
		//page already built
		if(_this.pages[pageName]){
			_this.pages[pageName].domElement.classList.remove('none'); //show page
			return _this.pages[pageName];
		}
		//build page
		var pageContainer = elements.pagesContainer.addElement('div', 'pageContainer ' + pageName.toUpperCase() + 'PageContainer');  //creates page container
		var pageContent = {};
		if(builder["build" + pageName.toUpperCase() + "Page"]){
			//calls the page building method formed by the page name
			pageContent = builder["build" + pageName.toUpperCase() + "Page"]({container: pageContainer, structure: currentPageStructure});
		}
		_this.pages[pageName] = {
			domElement: pageContainer,
			elements: pageContent
		};
		return _this.pages[pageName];
	};
	
	/*getters*/
	this.getCurrentPage = function(){
		if(_this.pages[_this.currentPage]){
			return _this.pages[_this.currentPage]
		}
		console.log("no current page???", _this.pages);
		return {};
	};
	
	/*init*/
	(function(){
		//builds the page containers container
		elements.pagesContainer = document.body.addElement('div', 'pagesContainer');
	})();
}