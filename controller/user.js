var params='';
var dbpool=require('./../db/connection');
var aes=require('./../util/aes');
var strjson2Obj=require('./../util/strJson2Obj');
var response2Json=require('./../util/response2json');
var StringUtil=require('./../util/strUtil');
var CodeStatic=require('./../static/codeStatic');
/*获得连接池*/
var pool=dbpool.pool;

var queryAccountExisted=function(req,res){
	var sql='select count(1) as pc from silivall_user_oauth where 1=1 ';
	params=req.body.para;
	var data=strjson2Obj.jsonStr2Obj(params,true);
	/*记录请求日志*/
	console.log('request queryAccountExisted data is:'+JSON.stringify(data));
	var thirdId=data.third;
	var openid=data.openid;
	var reg=/^\w+$/;
	if(StringUtil.isEmpty(thirdId) || StringUtil.isEmpty(openid) || !reg.test(openid)){
		return response2Json.errorParams(res);
	}
	sql += ' and oauth_third_id=\''+thirdId+'\' and openid=\''+openid+'\'';
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
				return response2Json.responseApiJson(res,{'code':CodeStatic.Code.STATUS_OK,'count':count},true)
				
			}
			/*连接池链接释放*/
			con.release();
		});
	});
}
exports.queryAccountExisted=queryAccountExisted;