var http=require('http');
var https=require('https');
var qs=require('querystring');
var iconv=require('iconv-lite');
var BufferHelper=require('bufferhelper');
var Url=require('url');
/**
 * 构建请求httpHelper 
 * 实现get post请求
 * 默认编码UTF-8
 */
var httpHelper={
	request:function(options,timeout,data,callback,encoding){
		var httpLib=http;
		if(options.protocol && options.protocol==='https:'){
			httpLib=https;
		}
		var content={};
		if(options.json){
			content=JSON.stringify(data);
		}else{
			content=(options.encode&&options.encode.toLocaleLowerCase()=='gbk') ? qs.stringify(data,null,null,{encodeURIComponent:escape}):qs.stringify(data);
		}

		if(options.method.toLowerCase()==='post'){
			options.headers=options.headers||{};
			options.headers['Content-Type']=options.json?'application/json':'application/x-www-form-urlencoded';
			options.headers['Content-Length']=Buffer.byteLength(content);
		}

		options.buffer=options.buffer||false;
		var req=httpLib.request(options,function(res){
			var bufferHelper=new BufferHelper();
			res.on('data',function(chunk){
				bufferHelper.concat(chunk);
			});
			res.on('end',function(){
				var _data;
				if(options.buffer){
					_data=bufferHelper.toBuffer();
				}else{
					if(typeof encoding!='undefined'){
						_data=iconv.decode(bufferHelper.toBuffer(),encoding);
					}else{
						_data=iconv.decode(bufferHelper.toBuffer(),'utf-8');
					}
				}
				callback(null,_data,res,req);
			});
		});
		req.on('error',function(err){
			callback(err);
		});
		req.write(content);
		if(timeout&&timeout>0){
			req.setTimeout(timeout,function(){
				callback(new Error('request timeout'));
			});
		}
		req.end();
	},
	get:function(url,timeout,callback,header,encoding){
		var options=Url.parse(url);
		options.method='GET';
		if(header){
			options.headers=header;
		}
		this.request(options,timeout,{},callback,encoding);
	},
	post:function(url,timeout,data,callback,header,encoding,reqEncoding,json){
		var options=Url.parse(url);
		options.method='POST';
		if(header){
			options.headers=header;
		}
		if(reqEncoding){
			options.encode=reqEncoding;
		}
		if(json){
			options.json=json;
		}
		this.request(options,timeout,data,callback,encoding);
	}
};

module.exports = httpHelper;