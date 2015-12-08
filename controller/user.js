var params='';
var dbpool=require('./../db/connection');
var aes=require('./../util/aes');
var strjson2Obj=require('./../util/strJson2Obj');
var response2Json=require('./../util/response2json');
var StringUtil=require('./../util/strUtil');
var CodeStatic=require('./../static/codeStatic');
var DateUtil=require('./../util/dateUtil.js');
/*获得连接池*/
var pool=dbpool.pool;

function  createUid(con,type) {
	var date=new Date();
	var uid=CodeStatic.Server.SERVER_ID+date.pattern("MMdd");
	//待生成uid
}
var queryAccountExisted=function(req,res){
	
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
	var sql='select uid from silivall_user_oauth where 1=1 ';
	sql += ' and oauth_third_id=? and openid=? ';
	console.log('query sql is:'+sql);
	var count=0;
	/*连接池获得链接并进行查询*/
	pool.getConnection(function(err,con){
		if(err){
			console.log('POOL ==>'+err);
			throw err;
		}
		con.query(sql,[thirdId,openid],function(err,rows){
			if(err){
				console.log('conn query ==>'+err);
				throw err;
			}
			var data={};
			
			if(StringUtil.isObject(rows)){

				/*第三方登录账号已注册*/
				count=rows[0].uid;
				
				data.code=CodeStatic.Code.STATUS_OK;
				data.uid=count;
				data.isRegistered=0;
				return response2Json.responseApiJson(res,data,true);
				
			}else{

				data.code=CodeStatic.Code.STATUS_OK;
				data.uid='';
				data.isRegistered=1;
				return response2Json.responseApiJson(res,data,true);
			}
			/*连接池链接释放*/
			con.release();
		});
	});
}
exports.queryAccountExisted=queryAccountExisted;