//1.buffer 代表的是内存
//2.node 为了操作二进制 生产出来的一个类型，buffer默认展示成16进制，可以和字符串无条件转化
//2进制==>最大1   16进制==>最大f
//字符串在node 中只支持urf-8格式
//一个汉字utf-8有几个字节，3个字节
//比字节小的单位 1个字节8个位组成==>1个汉字24位，每个位由二进制组成
//console.log(Math.pow(2, 8) - 1);
//16进制最大值ff 代表10进制是255
//当前位的最大值*进制^当前所在位减1

//1)声明buffer 固定大小，buffer和数组非常像 有索引slice
var buffer = new Buffer(100);
//console.log(buffer);
//内容是什么样子的，将内容写到内存里
buffer.fill(1);
//console.log(buffer);
//2)通过数组
//var buffer = new Buffer(['a',17,18]);//不识别的都是0
var buffer = new Buffer([0x16,0x17,18]);//不识别的都是0
//3.字符串创建
var buffer=new Buffer("珠峰");
//console.log(buffer.toString());//将buffer转换成字符串toString()

//copy concat
var buf1=new Buffer("珠峰");
var buf2=new Buffer("培");
//console.log(buf1.length);
var bigBuffer = new Buffer(12);
buf1.copy(bigBuffer,);
buf2.copy(bigBuffer,buf1.length);
//console.log(bigBuffer.toString());

//slice 数组的slice 截取 返回的是新数组？？？ 深拷贝 浅拷贝
var arr=[1,2,3]; // ffxxff
var A=[arr,3,4,function () {}]; //深拷贝 递归循环拷贝
//var newArr = A.slice();//浅拷贝  [ffxxff,4,5]
//var newArr = JSON.parse(JSON.stringify(A));//深拷贝 ,json中不识别函数
let newArr = [];
Object.assign(newArr,A);//浅拷贝 es6中 $.extend
arr[0] = 100;
//console.log(newArr);// [ [ 100, 2, 3 ], 3, 4 ]

var buffer = new Buffer([1,2,3]);//buffer中放的是内存地址 [[],[],[]],可以将buffer看成是二维数组
console.log(buffer);
let newBuffer = buffer.slice(0,1);
newBuffer[0]=100;
console.log(buffer);

//concat是类上的方法Buffer,Buffer是global上的方法
var buf1=new Buffer("珠峰");
var buf2=new Buffer("培");
var buf3=new Buffer("美丽");
var buf4=new Buffer("大方");
//模拟一个concat方法 myConcat
/*Buffer.myConcat=function (list,totalLength) {
    //1.先判断是否传入totalLength,如果没传递，计算总长 typeOf
    if(typeof totalLength === 'undefined'){
        totalLength=0;
        list.forEach(item=>totalLength+=item.length);//计算长度
    }
    //2.创建一个新buffer
    let buffer = new Buffer(totalLength);
    //3.循环数组 将每一项 拷贝到大buffer上
    let index = 0;
    list.forEach(item=>{
        item.copy(buffer,index);
        index+=item.length;
    });
    //4.截取有效长度
    return buffer.slice(0,index);
};*/
Buffer.myConcat=function (list,totalLength) {
    //1.先判断是否传入totalLength,如果没传递，计算总长 typeOf
    if(typeof totalLength === "undefined"){
        totalLength=0;
        list.forEach(item=>totalLength+=item.length);
    }
    //2.创建一个新buffer
    let buffer = new Buffer(totalLength);
    //3.循环数组 将每一项 拷贝到大buffer上
    let index = 0;
    list.forEach(item=>{
        item.copy(buffer,index);
        index+=item.length;
    });
    //4.截取有效长度
    return buffer.slice(0,index);
};
//console.log(Buffer.myConcat([buf1, buf2, buf3, buf4]).toString());
//console.log(Buffer.concat([buf1, buf2, buf3, buf4]).toString());







