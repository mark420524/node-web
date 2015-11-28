var mysql=require('mysql');
var property=require('./property');
var pool=mysql.createPool({
		host:property.mysql.host,
		user:property.mysql.user,
		password:property.mysql.password,
		database:property.mysql.database,
		port:property.mysql.port,
		charset:property.mysql.charset
	});
	/**
	var connection=pool.getConnection(function(err,con){
		if(err){
			console.log('POOL ==>'+err);
			throw err;
		}
		module.exports.connection=con;
		
	});
	return module.exports.connection;
	*/
exports.pool=pool;
