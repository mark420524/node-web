var aes=require('./aes');
exports.jsonStr2Obj=function(str,isEncrypt){
	if(isEncrypt){
		str=aes.decrypt(str);
	}
	var obj=eval('('+str+')');
	return obj;
};