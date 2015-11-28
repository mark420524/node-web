var sendData=function(req,res){
	return res.json({'code':req.query.param});
}
exports.sendData=sendData;