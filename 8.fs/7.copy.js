let fs = require('fs');
//64K 16K 4:1
/*
function copy(source,target) {
    //每次读取一次，一次读取4b，每次写入只能写入1个
    let rs = fs.createReadStream(source,{highWaterMark:4});
    let ws = fs.createWriteStream(target,{highWaterMark:1});
    //1.先读一次去写，如果写不下，此时要暂停读取
    rs.on('data',function (data) {
        let flag = ws.write(data);
        if(!flag)rs.pause();//如果写不进去了，就暂停读取
    });
    //2.写入完成后恢复读取
    ws.on('drain',function () {//抽干，将要写入的内容全部写入
        console.log('执行几次');
        rs.resume(); //恢复读取
    });
    //3.最后关闭读和写的文件
    rs.on('end',function () {
        ws.end();
    })
}
copy('2.txt','3.txt');
*/
function copyd(source,target) {
    let rs = fs.readFile(source,{highWaterMark:4});
    let ws = fs.writeFile(target,{highWaterMark:1});
}
copyd('2.txt','3.txt');