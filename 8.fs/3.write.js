let fs=require('fs');
//1.写的默认编码格式是utf8编码
//2.没有时会创建，写时会自动生成，写入前会先清空文件
//fs.writeFileSync('1.txt',1);
//fs.writeFileSync('1.txt',{name:1});//输出的是[object object],所以需要转成json
//fs.writeFileSync('1.txt',JSON.stringify({name:1}));//输出的是[object object],所以需要转成JSON.stringify()
//3.追加
//fs.appendFile('1.txt',1);

fs.writeFile('1.txt','你好',function (err) {//如果是异步，必须使用callback
    console.log(arguments);
});
