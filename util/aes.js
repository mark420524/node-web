/**
 *	加密,解密方法
 *	
 */
var crypto=require('crypto');
/**
 * 加密解密方式
 */
var algorithm='aes-128-ecb';

var key='KZh_AsY#16_o0pzm';
var charset='utf8';
var cipherEncoding='base64';
var iv='';


var encrypt=function(plaintext){
	//加密
	var cipher=crypto.createCipheriv(algorithm,key,iv);
	var cipherChunks=[];
	cipherChunks.push(cipher.update(plaintext,charset,cipherEncoding));
	cipherChunks.push(cipher.final(cipherEncoding));
	var encrypt=cipherChunks.join('');
	encrypt=encrypt.replace(/\+/g,'%2b');
	return encrypt;
};

var decrypt=function(encrypttext){
	encrypttext=encrypttext.replace(/(%2b)/g,'+');
	//解密start
	var decipher=crypto.createDecipheriv(algorithm,key,iv);
	var plainChunks=[];
	plainChunks.push(decipher.update(encrypttext,cipherEncoding,charset));
	plainChunks.push(decipher.final(charset));
	return  plainChunks.join('');
}

exports.encrypt=encrypt;
exports.decrypt=decrypt;

