var dbpool=require('./../db/connection');
var StringUtil=require('./../util/strUtil');
/*获得连接池*/
var pool=dbpool.pool;
var token= {
	getToken:function(){
		var token='';
		pool.getConnection(function(err,con){
			if(err){
				console.log('POOL ==>'+err);
				throw err;
			}
			var sql='select access_token,expires_in,application, create_time from silivall_hx_token limit 0,1';
			con.query(sql,function(err,rows){
				if(StringUtil.isObject(rows)){
					token=rows[0].access_token;
				}else{
					console.log('12313');
					token= '';
				}
			});
			/*连接池链接释放*/
			con.release();
		});
		return token;
	}

}
module.exports=token;