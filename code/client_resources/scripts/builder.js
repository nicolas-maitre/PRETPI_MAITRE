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
        var searchInput = topBar.addElement('input', 'MWALeftPanelSearchInput');
        var searchButton = topBar.addElement('button', 'MWALeftPanelSearchButton');
		var addButton = bottom.addElement('button', "MWALeftPanelAddButton");
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
		msgSection.style["height"] = "calc(100% - " + (writeHeight + 10) + "px - 51px)";
        input.style["height"] = "30px";
		input.setAttribute("placeholder", "Ecrivez votre message");
		nameInfoButton.innerText = "i";
		sendBtn.innerText = ">";
		//event
		sendBtn.addEventListener("click", function(evt){
			actions.sendInstantMessage(input);
		});
		
		//test hardcoded
		nameName.innerText = "Nicolas Glassey, Nicolas Maitre";
		nameImage.style.backgroundImage = "url(/images/demo/dropbox.png)";
		
        //return
        return{
            domElement: element,
			msgSection: msgSection,
            input: input,
            sendButton: sendBtn,
			nameImage: nameImage,
			nameText: nameName,
			namePseudo: namePseudo,
			nameInfoButton: nameInfoButton
        }
    }
	
	/*LOGIN*/
	this.buildLOGINPage = function(params){
		var form = buildLoginForm(params.container);
		return {
			form: form
		}
	}
	function buildLoginForm(container){
		var formWindow = container.addElement('div', 'loginFormWindow');
		var form = formWindow.addElement(/*'form'*/ 'div', 'loginForm');
		//temp user selector
		var buttonUser1 = form.addElement('button', 'loginTempUserButton');
		var buttonUser2 = form.addElement('button', 'loginTempUserButton');
		
		//properties
		buttonUser1.innerText = "nmaitre";
		buttonUser2.innerText = "nglassey";
		
		//events
		buttonUser1.addEventListener('click', function(){
			userObject = {
				id: "bb686737-5080-11e9-809c-b827eb4f1633",
				token: "1234-1234-1234-1234-1234"
			};
			wsManager = new WebSocketManager();
			pagesManager.changePage('mwa');
		});
		
		buttonUser2.addEventListener('click', function(){
			userObject = {
				id: "f319ca59-5080-11e9-809c-b827eb4f1633",
				token: "2345-2345-2345-2345-2345"
			};
			wsManager = new WebSocketManager();
			pagesManager.changePage('mwa');
		});
		
		return{
			domElement: formWindow
		}
	}
	
	/*CONTENT ADAPTERS*/
	this.buildMessageAdapter = function(container, data, options){
		console.log("buildMessageAdapter", data);
		/*data{
			userObject,
			text,
			imageId,
			timestamp
		}
		*/
		var extraClass = "foreignMessage";
		if(userObject.id == data.userObject.id){
			extraClass = "selfMessage";
		}
		//create
		var line = container.addElement('div', 'messageAdapterLine ' + extraClass);
		var box = line.addElement('div', 'messageAdapterBox ' + extraClass);
		var name = box.addElement('div', 'messageAdapterName');
		var text = box.addElement('div', 'messageAdapterText');
		var time = box.addElement('div', 'messageAdapterTime ' + extraClass);
		
		//data
		name.innerText = data.userObject.first_name + " " + data.userObject.last_name;
		text.innerText = data.text;
		var displayDate = new Date(data.timestamp);
		time.innerText = displayDate.getHours() + "h" + displayDate.getMinutes();
	}
	
	//placholder
	this.buildMessagePlaceholder = function(){
		
	}
}