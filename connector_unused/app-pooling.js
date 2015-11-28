var mysql=require('mysql');
var pool;
if(!pool){
	pool=mysql.createPool({
		host:'localhost',
		user:'programmer',
		password:'$20%24^7programmer',
		database:'programmer_db',
		port:3306
	});
}
exports.pool=pool;


