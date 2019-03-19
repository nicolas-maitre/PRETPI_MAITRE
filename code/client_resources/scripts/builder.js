"use strict";
function Builder(){
	/*MWA*/
	this.buildMWAPage = function(params){
		var topMenu = buildMWATopMenu(params.container);
        var mainSection = params.container.addElement("div", "MWAMainSection");
		var leftPanel = buildMWAleftPanel(mainSection);
        var rightPanel = buildMWARightPanel(mainSection);
		return{
			topMenu: topMenu,
			leftPanel: leftPanel,
            rightPanel: rightPanel
		}
	}
	function buildMWATopMenu(container){
		var element = container.addElement('div', 'MWATopMenu');
		var left = element.addElement('div', 'MWATopMenuLeftSection');
		var right = element.addElement('div', 'MWATopMenuRightSection');
		var title = left.addElement('div', 'MWATopMenuTitle');
		var user = right.addElement('div', 'MWATopMenuUserSection');
		var userName = user.addElement('div', 'MWATopMenuUserName');
		var userImage = user.addElement('div', 'MWATopMenuUserImage');
		//properties
		title.innerText = "Messaging Web App";
		userName.innerText = "nmaitre2000";
		userImage.style.backgroundImage = "url(images/demo/dropbox.png)";
        //return
		return {
			domElement: element,
			title: title,
			userName: userName,
			userImage: userImage
		}
	}
	function buildMWAleftPanel(container){
		var element = container.addElement('div', 'MWALeftPanel');
        var topBar = element.addElement('div', 'MWALeftPanelTopBar');
        var bottom = element.addElement('div', 'MWALeftPanelBottomSection');
        var searchInput = topBar.addElement('input', 'MWALeftPanelSerachInput');
        var searchButton = topBar.addElement('button', 'MWALeftPanelSearchButton');
		var addButton = topBar.addElement('button', "MWALeftPanelAddButton");
		//properties
		addButton.innerText = "+";
        //return
        return{
            domElement: element,
            searchInput: searchInput,
            searchButton: searchButton,
			addButton: addButton
        }
	}
	
    function buildMWARightPanel(container){
        //create
        var element = container.addElement("div", "MWARightPanel");
		var nameSection = element.addElement("div", "MWANameSection");
        var msgSection = element.addElement("div", "MWAMessagesSection");
        var writeSection = element.addElement("div", "MWAWriteSection");
		var nameLeftSection = nameSection.addElement("div", "MWANameLeftSection");
		var nameRightSection = nameSection.addElement("div", "MWANameRightSection");
		var nameImage = nameLeftSection.addElement("div", "MWANameSectionImage");
		var nameName = nameLeftSection.addElement("div", "MWANameSectionName");
		var namePseudo = nameLeftSection.addElement("div", "MWANameSectionPseudo");
		var nameInfoButton = nameRightSection.addElement("button", "MWANameSectionInfoButton");
        var input = writeSection.addElement("textarea", "MWAWriteSectionTextInput");
        var sendBtn = writeSection.addElement("button", "MWAWriteSectionSendButton");
        //propetries
		var writeHeight = 30;
		msgSection.style["height"] = "calc(100% - " + (writeHeight + 10) + "px)";
        input.style["height"] = "30px";
		nameInfoButton.innerText = "i";
        //return
        return{
            domElement: element,
            input: input,
            sendButton: sendBtn
        }
    }
	
	/*LOGIN*/
}