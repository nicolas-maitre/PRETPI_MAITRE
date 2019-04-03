const credentials = require("../private/credentials");
const mariadb = require("mariadb");
const dbName = "messaging_web_app_db";
const dbPool = mariadb.createPool({
	host: 'localhost',
    user: 'mwa_user', 
	database: dbName,
    password: credentials.dbRootPass,
    connectionLimit: 5
});
function DatabaseManager(){
	var _this = this;
	//wrapper functions
	this.insertInto = async function(tableName, object, options, callBack){
		/*options
			directFields = {};
		*/
		var textRequest = "INSERT INTO " + tableName + " SET ";
		var dataRequest = [];
		var directFields = {};
		if(typeof options != "undefined" && options.directFields){
			directFields = options.directFields;
		}
		
		for(indField in object){
			textRequest += indField + " = ";
			
			if(directFields[indField]){
				textRequest += object[indField];
			} else {
				textRequest += "?";
				dataRequest.push(object[indField]);
			}
			textRequest += ", ";
		}
		textRequest = textRequest.substr(0, textRequest.length - 2);
		textRequest += ";";
		
		console.log("insertInto request", textRequest);
		
		_this.queryDb(textRequest, dataRequest, callBack);
	};
	
	this.select = async function(params = {}, callBack){
		/*params
			fields (text),
			tableName (text),
			where (text),
			data(array),
			extraText (text)
		*/
		var dataRequest = (params.data ? params.data : []);
		var textRequest = "SELECT ";
		textRequest += (params.fields ? params.fields + ", active" : "*");
		textRequest += " FROM " + params.tableName;
		if(params.where){
			textRequest += " WHERE " + params.where;
		}
		if(params.extraText){
			textRequest += " " + params.extraText;
		}
		textRequest += ";";
		
		console.log("select request:", textRequest);
		_this.queryDb(textRequest, dataRequest, function(error = false, result = false){
			if(error){
				callBack(error, false);
				return;
			}
			
			//clean result
			var returnResult = [];
			for(var indResult = 0; indResult < result.length; indResult++){
				var currentResult = result[indResult];
				if(currentResult.meta){
					delete currentResult.meta;
				}
				if(currentResult.active || typeof currentResult.active == 'undefined'){
					returnResult.push(currentResult)
				}
			}
			//return
			callBack(false, returnResult);
		});
	}
	
	//db query
	this.queryDb = async function(request, data, callBack){
		var dbConnection = false;
		try{
			//console.log("dbPool", dbPool);
			dbConnection = await dbPool.getConnection();
			var result = await dbConnection.query(request, data);
			callBack(false, result);
		} catch(error) {
			callBack(error);
		} finally {
			if(dbConnection){
				dbConnection.end();
			}
		}
	};
}
module.exports = new DatabaseManager();