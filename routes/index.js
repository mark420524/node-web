/**
 * 路由中间件	
 */
var express=require('express');
var route=express.Router();
var base=require('./../controller/base');
var user=require('./../controller/user');
var test=require('./../controller/test');

route.get('/',function(req,res){
	param=req.query.param;
	console.log('request param is:'+param);
	res.status(403).send('you do not have the rights!!!');
	res.end();
});
route.get('/data',base.sendData);
route.post('/user/queryAccountExisted',user.queryAccountExisted);
route.get('/test',test.test);
route.get('/js_test',test.jsTest);
route.post('/test/encrypt',test.encrypt);
route.post('/test/decrypt',test.decrypt);
route.post('/test/miw/jiemi',test.decrypt);
module.exports=route;
