var pooling=require('./../connector/app-pooling');
var pool=pooling.pool;
var accountIsExisted=function(sql){
	var count=0;
	pool.getConnection(function(err,con){
		if(err){
			console.log('POOL ==>'+err);
			throw err;
		}
		con.query(sql,function(err,rows){
			if(err){
				console.log('conn query ==>'+err);
				throw err;
			}
			if(rows){
				count=rows[0].pc;
				console.log(count);
			}
			con.release();
		});
	});
	return count;
}

var count=accountIsExisted(' select count(1) as pc from silivall_user_oauth ');
console.log('result is '+count);
