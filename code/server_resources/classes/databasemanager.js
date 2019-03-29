const mariadb = require("mariadb");
const dbPool = mariadb.createPool({
	host: '127.0.0.1',
    user:'root', 
    password: 'DEHO179zjn',
    connectionLimit: 5
});
function DatabaseManager(){
	var _this = this;
	this.executeSQL = async function(request, data = [], callBack){
		var response = queryDb(request, data);
		if(response.error){
			callBack(response.error);
		}
	}
	this.querySQL = async function(request, data = [], callBack){
		var response = queryDb(request, data);
		if(response.error){
			callBack(response.error);
		}
	}
	function queryDb(request, data){
		var result = false;
		var error = false;
		try{
			var dbConnection = await dbPool.getConnexion();
			result = await connection.query(request, data);
		} catch(error) {
			error = error;
		} finally {
			if(dbConnection){
				dbConnection.end();
			}
			return {error:error, result:result};
		}
	}
}
module.exports = new DatabaseManager();