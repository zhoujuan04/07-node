//可读流readStream  可写流writeStream  他是有顺序的，有起点和终点，不关心文件的整体内容，只关心读到的内容

let fs=require('fs');
//1.读取时文件必须存在
//2.highWaterMark 默认64K ,分段读取
//3.读取默认都是buffer
let rs = fs.createReadStream('./name.txt',{highWaterMark:1});//创建流相当于买水果
//console.log(rs);
//默认这种模式 叫 非流动模式 -> 流动模式
let arr = []; //Buffer.myConcat([buf1, buf2, buf3, buf4])

//读取流相当于洗水果
rs.on('data',function (data) {//node会不停的rs.emit("data",data);
    //console.log(data);//疯狂的触发，
    arr.push(data);
    rs.pause(); //暂停的是data事件触发
    setTimeout(function () {
        rs.resume();//恢复的是data事件
    });
});
rs.on('end',function () {
    console.log(Buffer.concat(arr).toString());
   // console.log(data);
});//当这个文件读取完成后，就会触发end事件
rs.on('error',function (err) { //rs.emit("error",err)
    console.log(err);
});

//audio pause() resume()
//stream的方法 on('data')  on('end')  on('error')  pause  resume

//req是一个可读流
req.on('data',function(){});
req.on('end',function(){});