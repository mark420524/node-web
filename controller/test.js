var aes=require('./../util/aes');

var test=function(req,res){
	res.render('test');
}
var jsTest=function(req,res){
	res.render('js_test');
}
var encrypt=function(req,res){
	var param=req.body.param;
	console.log('req.body is :'+req.body);
	if (!param){
		res.status(200).json({'data':'error params'});

		res.end();
	}else{
		res.status(200).json({'data':aes.encrypt(param)});

		res.end();
	}
}
var decrypt=function(req,res){
	var param=req.body.param;
	if (!param){
		res.status(200).json({'data':'error params'});

		res.end();
	}else{
		param=aes.decrypt(param);
		var jsonObj=eval('('+param+')');
		res.status(200).send(jsonObj);
		res.end();
	}
}
exports.encrypt=encrypt;
exports.decrypt=decrypt;
exports.test=test;
exports.jsTest=jsTest;