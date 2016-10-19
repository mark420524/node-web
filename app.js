/*web 框架*/
var express=require('express');
/**解析html的框架*/
var ejs=require('ejs');
var app=express();
var route=require('./routes/index');
/*解析post传参问题*/
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views','./view');
app.set('view engine','html');
app.engine('.html',ejs.__express);
app.use('/static',express.static('./public'));
app.use(route);
app.listen(80);
console.log('server running at 80');