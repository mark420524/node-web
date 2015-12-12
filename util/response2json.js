var code='code';
var data='data';
var aes=require('./aes');
var CodeStatic=require('./../static/codeStatic');
var responseApiJson=function(res,jsonObj,isencrypt){
	if(isencrypt){
		res.status(CodeStatic.Http.STATUS_200).send(aes.encrypt(JSON.stringify(jsonObj)));
	}else if(jsonObj){
		res.status(CodeStatic.Http.STATUS_200).json({code:CodeStatic.Code.STATUS_OK,data:jsonObj});
	}else{
		res.status(CodeStatic.Http.STATUS_200).json({code:CodeStatic.Code.STATUS_DATA_NOT_EXISTED});
	}
}
var responseException=function(res){
	res.status(CodeStatic.Http.STATUS_200).json({code:CodeStatic.Code.STATUS_EXCEPTION});
}
var responseApiErrorParams=function(res){
	res.status(CodeStatic.Http.STATUS_200).json({code:CodeStatic.Code.STATUS_PARAMS_ERROR});
}
exports.errorParams=responseApiErrorParams;
exports.responseApiJson=responseApiJson;
exports.responseException=responseException;