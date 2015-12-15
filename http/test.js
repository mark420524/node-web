/**
 *	模拟http请求url
 */
var httpHelper=require('./httpHelper');
var url='http://search.ny.cn/sug';
var header={
	'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'Accept-Encoding':'gzip, deflate, sdch',
	'Accept-Language':'zh-CN,zh;q=0.8',
	'Cache-Control':'max-age=0',
	'Connection':'keep-alive',
	'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36'
}
httpHelper.get(url,10000,function(err,data){
	if(err){
		console.log(err);
	}
//	console.log(data);
},header);
var data={
	'callback':'nodejs',
	'q':'内衣',
	'limit':'10',
	'type':'productSearch'
}
httpHelper.post(url,10000,data,function(err,data){
	if(err){
		console.log(err);
	}
	console.log(data);
},header);