var mysql=require('mysql');
var conn=mysql.createConnection({
	host:'localhost',
	user:'programmer',
	password:'$20%24^7programmer',
	database:'programmer_db',
	port:3306
});
conn.connect();
conn.query('select SYSDATE() as time;',function(err,rows,fields){
	if(err){
		throw err;
	}
	console.log('The result is: '+rows[0].time);
});
/**
console.log(conn);
*/
conn.end;
