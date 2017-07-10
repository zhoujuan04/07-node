//扩展es6==>const arr = [];//不能更改地址,但可以push到数据

//创建http服务 ip地址 port端口号
//node提供自带的模块http
let http=require('http');
let listener = function (request,response) {//监听函数，客户端的响应
    //request是一个可写流 ws.write() ws.end();
    //客户端的响应头更改
    response.setHeader('content-Type','text/plain;charset=utf-8');
    //response.setHeader('a',1);
    //response.write("welcome"); //写在响应体
    response.end("你好");//调用end之后，会将内容发送完毕显示到浏览器上
    //favicon.ico发送请求是看心情的，如果发现不存在，以后就不请求了
};
//不要用3000以下的端口
let port = 8787;
http.createServer(listener).listen(port,function () {
    console.log(port+" start");
});
//改动服务端代码，必须重新启动
//nodemon 实现自动重启 可以在命令行中使用全局安装  npm install nodemon -g
//进入到当前要执行的文件夹下  执行nodemon 1.http.js
//EADDRINUSE :::8989 占用商品号
