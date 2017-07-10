//声明buffer 固定大小，buffer和数组非常像 有索引slice
//1.通过长度定义buffer
var buffer = new Buffer(10);
//console.log(buffer);//<Buffer 00 00 00 00 00 00 00 00 00 00>
//*** 手动初始化,擦干净桌子,将buffer内容清0
buffer.fill(12);
//console.log(buffer);//把填充的数字转成buffer16进制 <Buffer 0c 0c 0c 0c 0c 0c 0c 0c 0c 0c>
//2.通过数组进行声明
var buffer = new Buffer([0,17,18]);
//console.log(buffer);//<Buffer 00 11 12>转成16进制
//3.字符串创建
var buffer = new Buffer('我们');
//console.log(buffer);//<Buffer e6 88 91 e4 bb ac>
//如果将buffer转成字符串，使用toString()方法
//console.log(buffer.toString());//我们

//### Buffer的常用方法 copy(复制) concat(合并) slice()

//#### copy(targetBuffer, targetStart, sourceStart, sourceEnd)//sourceS(来源)
var buf1=new Buffer("好人");
var buf2=new Buffer("超级帅");
var bigBuffer = new Buffer(15);
//console.log(buf1.length); //6
//console.log(buf2.length); //9
//console.log(bigBuffer.length); //15
buf1.copy(bigBuffer);
buf2.copy(bigBuffer,buf1.length);// targetBuffer, targetStart
//console.log(bigBuffer.toString());

//#### slice截取

//1.问题 数组的slice 返回的是新数组？？？ 深拷贝，浅拷贝
var arr=[1,2,3]; //arr开辟了一个内存地址为xxxfff
var A = [arr,4,5,6,function () {}]; //A开辟了一个内存地址为xxxfff111但包含了xxxfff
//1)slice 浅拷贝 [xxxfff,4,5] xxxfffn改变了，A的也会改变
//var newArr = A.slice();// 浅拷贝  [xxxfff,4,5];
//2)JSON.parse(JSON.stringify())深拷贝 ,json中不识别函数
//var newArr = JSON.parse(JSON.stringify(A));
//3)深拷贝 递归循环拷贝
//4)浅拷贝 es6中 $.extend
let newArr = [];
Object.assign(newArr,A);
arr[2]=5; //xxxfffn改变了，A的也会改变
//console.log(newArr);

//2.buffer的slice
//buffer中放的是内存地址 [[],[],[]],可以将buffer看成是二维数组
var buffer = new Buffer([1,2,3]);
var newBuffer = buffer.slice(2,3);
//console.log(newBuffer);
newBuffer[0]=50;
//console.log(buffer);

//#### concat是类上的Buffer方法，Buffer是global上的方法
var buf1=new Buffer("珠峰");
var buf2=new Buffer("培");
var buf3=new Buffer("美丽");
var buf4=new Buffer("大方");

//直接使用Buffer的方法concat
//console.log(Buffer.concat([buf1, buf2, buf3, buf4]).toString());

//模拟一个concat方法 myConcat
Buffer.myConcat=function (list,totalLength) {
    //1.先判断tot alLength,如果没有传，要判断list的长度，使用typeOf
    if(typeof totalLength === "undefined"){
        totalLength = 0;
        list.forEach(item=>totalLength+=item.length);
    }
    //2.创建Buffer
    let buffer = new Buffer(totalLength);
    //3.循环list数组，并拷贝到buffer上
    let index = 0; //index==>targetStart
    list.forEach(item=>{
        item.copy(buffer,index);
        index+=item.length;
    });
    //4.返回buffer并截取有效的长度
    return buffer.slice(0,index); //
};
//console.log(Buffer.myConcat([buf1, buf2, buf3, buf4]).toString());

//## 进制转换
//将任意进制转化成10进制 parseInt
//将任意进制转化成任意进制 toString

//console.log(parseInt('123',8)); //将(第二个值)进制的(第一个值)转换为10进制
//console.log((56).toString(2));

//#### base64 转图片 转文字，没有加密功能， 最大取值是在64之内

let bufferBase = new Buffer('珠');
console.log(bufferBase);
//e7 8f a0
console.log(0xe7.toString(2));
console.log(0x8f.toString(2));
console.log(0xa0.toString(2));
//111001 111000 111110 100000
console.log(parseInt('111001',2));
console.log(parseInt('111000',2));
console.log(parseInt('111110',2));
console.log(parseInt('100000',2));
//57 56 62 32
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str+=str.toLowerCase();
str+='0123456789';
str+='+/';
console.log(str[57]+str[56]+str[62]+str[32]);