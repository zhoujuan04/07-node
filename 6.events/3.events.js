//1.events 库 专门实现 事件的 是一个核心模块
let EventEmitter=require('events');//导入events库
let util=require('util'); //setPrototypeOf 继承这个库
function Man() {
    this._events={};
}
util.inherits(Man,EventEmitter);
function buyCar(who,who1) {
    console.log("买车给"+who+who1);
}
function buyPack(who,who1) {
    console.log("买房给"+who+who1);
}
let man=new Man();
man.once("有钱",buyCar);
man.on("有钱",buyPack);
man.removeListener("有钱",buyPack);
man.emit("有钱","大妹子","小妹子");
man.emit("有钱","大妹子","小妹子");
