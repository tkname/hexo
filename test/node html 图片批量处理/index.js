var express = require('express');
var app = express();
var fs = require('fs');


var bodyParser=require('body-parser');

//设置post 请求body为json post数据大小为limit：50mb
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));


app.post('/upload', function(req, res){

    //设置请求跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-control-Allow-Headers", "xCors");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS,HEAD,FETCH");

    //接收前台POST过来的base64
    var imgData = req.body.img;

    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile('code/code_'+req.body.code+".png", dataBuffer, function(err) {
    if(err){
      res.send(err);
    }else{
      res.send("保存成功！");
      console.log('code_'+req.body.code+".png");
    }
    });

});

 app.get('/cc', function(req, res){
  console.log(333);
  res.send(req);

 });
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})

