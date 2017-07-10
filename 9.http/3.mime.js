//npm install mime --save
let http = require('http');
let fs = require('fs');//读取文件
let mime = require('mime');
let url = require('url');//内置模块，他可以将路径转化为 对象
http.createServer(function (req,res) {
    //获取请求的路径
    let {pathname,query} = url.parse(req.url,true);//true的作用是将query转成对象
    console.log(pathname,query);
    if( pathname === '/'){
        res.setHeader('Content-Type','text/html;charset=utf-8');
        fs.createReadStream('./index.html').pipe(res);
    }else{ //  /style.css  /js.js
        let flag = fs.existsSync('.'+pathname);//如果存在在读取，否则直接404
        if(flag){
            res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf-8');
            fs.createReadStream('.'+pathname).pipe(res)
        }else{
            res.statusCode = 404;
            res.end('not Found');
        }
    }
}).listen(8080,function () {
    console.log("8080 ok");
});

