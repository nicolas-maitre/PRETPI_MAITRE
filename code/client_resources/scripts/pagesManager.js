"use strict"
function PagesManager(){
	var _this = this;
	this.pages = {};
	this.currentPage = ""; //default page
	
	this.changePage = function(pageName, options = {}){
		console.log("change page to " + pageName + " from " + _this.currentPage);
		if(_this.currentPage == pageName){ //page already shown
			console.log("page already shown");
			return false;
		}
		if(!pagesConfig[pageName]){//non existant page (in structure)
			console.log("this page doesn't exist");
			return false;
		}
		var currentPageStructure = pagesConfig[pageName];
		if(_this.currentPage){//hide current page
			_this.pages[_this.currentPage].domElement.classList.add('none');
		}
		
		//history management
		if(!options.isPopState){
			history.pushState({pageName:pageName}, "Messaging Web App", "/mwa");
		}
		
		_this.currentPage = pageName;
		
		if(_this.pages[pageName]){//show already loaded page
			_this.pages[pageName].domElement.classList.remove('none');
			return _this.pages[pageName];
		}
		//build page
		var pageContainer = elements.pagesContainer.addElement('div', 'pageContainer ' + pageName + 'PageContainer');
		var pageContent = {};
		if(builder["build" + pageName.toUpperCase() + "Page"]){
			pageContent = builder["build" + pageName.toUpperCase() + "Page"]({container: pageContainer, structure: currentPageStructure});
		}
		_this.pages[pageName] = {
			domElement: pageContainer,
			elements: pageContent
		};
		return _this.pages[pageName];
	};
	/*init*/
	(function(){
		//prepare page
		elements.pagesContainer = document.body.addElement('div', 'pagesContainer');
	})();
}