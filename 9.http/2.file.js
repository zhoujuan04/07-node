let http = require('http');
let fs = require('fs');
http.createServer(function (req,res) {
    //获取请求的路径
    let pathname = req.url;
    console.log(pathname);
    let mime = {
        '.css':'text/css',
        '.js':'application/javascript',
        '.html':'text/html'
    };
    if( pathname=== '/'){
        res.setHeader('Content-Type','text/html;charset=utf-8');
        fs.createReadStream('./index.html').pipe(res);
    }else{ //  /style.css  /js.js
        let flag = fs.existsSync('.'+pathname);//如果存在在读取，否则直接404
        if(flag){
            let type = mime[pathname.match(/\.\w+$/)[0]];
            res.setHeader('Content-Type',type+';charset=utf-8');
            fs.createReadStream('.'+pathname).pipe(res)
        }else{
            res.statusCode = 404;
            res.end('not Found');
        }
    }

    /*else{
        res.statusCode=404;
        res.end('not Found');
    }*/
}).listen(8080,function () {
    console.log("8080 ok");
});



//使用readFile方法
/*fs.readFile('./index.html',function (err,data) {
 if(err) return console.log(err);
 res.end(data);
 })*/
//使用pipe的方法会自动的调用
//fs.createReadStream('./index.html').pipe(res);

/*
 if(pathname === '/style.css'){
     res.setHeader('Content-Type','text/css;charset=utf-8');
     fs.createReadStream('./style.css').pipe(res);
 }else if(pathname === '/js.js'){
     res.setHeader('Content-Type','application/javascript;charset=utf-8');
     fs.createReadStream('./js.js').pipe(res);
 }
 */