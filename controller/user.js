var params='';
var dbpool=require('./../db/connection');
var aes=require('./../util/aes');
/*获得连接池*/
var pool=dbpool.pool;

var queryAccountExisted=function(req,res){
	var sql='select count(1) as pc from silivall_user_oauth';
	params=req.query.param;
	params=aes.decrypt(params);
	console.log('params is:'+params);
	var count=0;
	/*连接池获得链接并进行查询*/
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
				
				return res.json({'code':true,'count':count});
			}
			/*连接池链接释放*/
			con.release();
		});
	});
	
	
}
exports.queryAccountExisted=queryAccountExisted;