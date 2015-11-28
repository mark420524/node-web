var aes=require('./../util/aes');
var resJson=require('./../util/response2json.js');
var test=function(req,res){
	res.render('test');
}
var encrypt=function(req,res){
	var param=req.body.param;
	console.log('req.body is :'+req.body);
	if (!param){
		resJson.responseApiJson(res,'error params')
		res.end();
	}else{
		resJson.responseApiJson(res,param,true);
		res.end();
	}
}
var decrypt=function(req,res){
	var param=req.body.param;
	if (!param){
		resJson.responseApiJson(res,'error params')
		res.end();
	}else{
		param=aes.decrypt(param);
		res.status(200).json({'data':param});
		res.end();
	}
}
exports.encrypt=encrypt;
exports.decrypt=decrypt;
exports.test=test;