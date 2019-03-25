Element.prototype.addElement = function(type, className, options){
	var newElement = document.createElement(type);
	this.appendChild(newElement);
	if(typeof className === 'string'){
		newElement.setAttribute('class', className);
	}
	//if(typeof options === 'object'){}
	return newElement;
}

var utility = {};
utility.getImageAPIUrl = function(){
	
}