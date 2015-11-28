var CODE_STATUS_OK=100;
var CODE_STATUS_PARAMS_ERROR=101;
var CODE_STATUS_DATA_NOT_EXISTED=102;
var HTTP_STATUS_OK=200;
var code='code';
var data='data';
var aes=require('./aes');
var responseApiJson=function(res,jsonObj,isencrypt){
	if(isencrypt){
		res.status(HTTP_STATUS_OK).json({code:CODE_STATUS_OK,data:aes.encrypt(jsonObj)});
	}else if(data){
		res.status(HTTP_STATUS_OK).json({code:CODE_STATUS_OK,data:jsonObj});
	}else{
		res.status(HTTP_STATUS_OK).json({code:CODE_STATUS_DATA_NOT_EXISTED});
	}
}
exports.responseApiJson=responseApiJson;