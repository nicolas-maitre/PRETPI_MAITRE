"use strict"
function Builder(){
	/*MWA*/
	this.buildMWAPage = function(container, options = {}){
		var topMenu = buildMWATopMenu(container);
		var leftPanel = buildMWAleftPanel(container);
		return{
			topMenu: topMenu,
			leftPanel: leftPanel
		}
	}
	function buildMWATopMenu({container}){
		var element = container.addElement('div', 'MWATopMenu');
		var left = element.addElement('div', 'MWATopMenuLeftSection');
		var right = element.addElement('div', 'MWATopMenuRightSection');
		var title = left.addElement('div', 'MWATopMenuTitle');
		var user = right.addElement('div', 'MWATopMenuUserSection');
		var userName = user.addElement('div', 'MWATopMenuUserName');
		var userImage = user.addElement('div', 'MWATopMenuUserImage');
		
		title.innerText = "Messaging Web App";
		userName.innerText = "nmaitre2000";
		userImage.style.backgroundImage = "url(images/demo/dropbox.png)";
		return {
			domElement: element,
			title: title,
			userName: userName,
			userImage: userImage
		}
	}
	function buildMWAleftPanel(){
		
	}
	
	/*LOGIN*/
}