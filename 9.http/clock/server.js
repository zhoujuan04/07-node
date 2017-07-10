//npm install mime --save
let http = require('http');
let fs = require('fs');
let mime = require('mime');
let url = require('url');
http.createServer(function (req,res) {
    let {pathname,query} = url.parse(req.url,true);
    console.log(pathname,query);
    if( pathname === '/'){
        res.setHeader('Content-Type','text/html;charset=utf-8');
        fs.createReadStream('./index.html').pipe(res);
    }
    //1. /clock
    else if(pathname === '/clock'){
        let date = new Date().toLocaleString();
        //res.end(date);
        res.end(JSON.stringify({date}));//转成json字符串
    }else{
        let flag = fs.existsSync('.'+pathname);
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

