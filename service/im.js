var StringUtil=require('./../util/strUtil');
var __HXApi='https://a1.easemob.com/';
var __HXOrgName='silivall';
var __HXAppName='programmer';
var __clientId='YXA6lqIfQI5gEeWV4h-f2rMLOg';
var __clientSecret='YXA6OWm0RdOjRRNpk64VUMf_SEhdu24';

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
var easemobIM = {
	createUser:function(username,password){
		var reg=/^\d+$/;
		if(StringUtil.isEmpty(username) || !reg.test(username)){
			return false;
		}
		var url=getHxApiUserPath();
		
		return true;
	}
}
module.exports = easemobIM;