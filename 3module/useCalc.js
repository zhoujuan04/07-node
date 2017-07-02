//引用文件模块，必须使用相对路径./../，可以不增加后缀名，会自动帮你添加，.js .json .node报错
//同步还是异步是怎么区分的？有回调函数是异步
let calc = require('./calc');
console.log(calc);
//通过require拿到的并不是另一个文件的exports对象，而是另一个文件的module.exports对象

//1.可以给exports增加属性，他会导致module.exports的变化
//2.直接更改module.exports的指向
//错误的：直接更改exports不会导致module.exports的变化

//写一个求和函数，在另一个文件中使用