var im=require('./im');
//var im= new easemob();
var async=require('async');
var t=require('./../util/t');
var log=t.log;

async.series([
function(cb){im.getAccessToken(cb)},

function(cb){im.getAccessToken(cb)}
	
], function(err, results) {
	log('1.1 err: ', err);
	log('1.1 results: ', results);
});