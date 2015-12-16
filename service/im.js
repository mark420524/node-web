var StringUtil=require('./../util/strUtil');
var dbpool=require('./../db/connection');

/*获得连接池*/
var pool=dbpool.pool;


var __HXApi='https://a1.easemob.com/';
var __HXOrgName='silivall';
var __HXAppName='programmer';
var __clientId='YXA6lqIfQI5gEeWV4h-f2rMLOg';
var __clientSecret='YXA6OWm0RdOjRRNpk64VUMf_SEhdu24';
__accessToken='';
__expiresIn='';
function getHxApiPath(){
	return __HXApi+__HXOrgName+'/'+__HXAppName;
}
function getHxApiUserPath(){
	return getHxApiPath()+'/users';
}
function getHxApiTokenPath(){
	return getHxApiPath()+'/token';
}
function getHxApiMessagePath(){
	return getHxApiPath()+'/messages';
}
function getHxApiChatfilesPath(){
	return getHxApiPath()+'/chatfiles';
}

var easemob = {
	createUser:function(username,password){
		var reg=/^\d+$/;
		if(StringUtil.isEmpty(username) || !reg.test(username)){
			return false;
		}
		var url=getHxApiUserPath();
		
		return true;
	},
	getAccessToken:function(callback){
		var tokenUrl=getHxApiTokenPath();
		if(__accessToken){
			
			console.log(tokenUrl);
			callback(null,__accessToken);
		}else{
			pool.getConnection(function(err,con){
				if(err){
					console.log('POOL ==>'+err);
					throw err;
				}
				var sql='select access_token,expires_in,application, create_time from silivall_hx_token limit 0,1';
				con.query(sql,function(err,rows){
					if(StringUtil.isObject(rows)){
						__accessToken=rows[0].access_token;
						__expiresIn=rows[0].expires_in;
					}else{
						__accessToken='456';
						__expiresIn='123abc';
					}
					
					
					callback(null,__accessToken);
					
				});
				/*连接池链接释放*/
				con.release();
			});	
			
		}
		
	}
}
module.exports = easemob;





