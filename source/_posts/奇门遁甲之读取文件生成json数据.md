---
title: 奇门遁甲之读取文件生成json数据
date: 2018-12-12 21:18:49
tags: 文件 生成json数据
---

*好玩的东西总是有很多，等待你去发现*

    var fs = require("fs");

    var obj={};
        obj.fileArray=[];

    var date=new Date();
    var getTime=date.getTime();


    // 	 var jsonObj = JSON.parse(data); //字符串转json
    // 	fs.writeFileSync('./test.json', JSON.stringify(obj));  //josn转字符串
 
    function ecchDir(path){
        fs.readdir(path, function(err,files){
        files.forEach(function(file){
            fs.stat(path+file, function (err, stats) {	
                //需要配合 fs.stat使用
                if(stats.isDirectory()){
                    ecchDir(path+file+"/");
                }else{
                    if(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file)){
                        var oArray=file.split(".");	
                        var o={};
                        o.id=oArray[0];
                        o.src=path+file+"?v="+getTime;
                        obj.fileArray.push(o);	
                        // console.log(JSON.stringify(obj)+"r\n");
                        fs.writeFileSync('js/data.json', JSON.stringify(obj.fileArray));
                        console.log("正在生成"+path+file+"\n");
                    }
                }
            })
        })
    })
    }
    ecchDir("./images/");

