//1.模拟events的发布订阅
/*
function Man() {this._events={}}
Man.prototype.on=function (eventsName,callback) {// {"有钱":[buyCar]}
    if(this._events[eventsName]){
        this._events[eventsName].push(callback);
    }else{
        this._events[eventsName]=[callback];
    }
};
Man.prototype.emit=function (eventsName,...args) {
    if(this._events[eventsName]){
        this._events[eventsName].forEach(item=>item.call(this,...args));
    }
};
Man.prototype.removeListener=function (eventsName,callback) {
    if(this._events[eventsName]){
        this._events[eventsName]=this._events[eventsName].filter(item=>{
            return item!==callback && item.l!==callback;
        });
    }
};
Man.prototype.once=function (eventsName,callback) {
    function one() {
        callback.apply(this,arguments);
        this.removeListener(eventsName,one);
    }
    this.on(eventsName,one);
    one.l=callback;
};
function buyCar(who,who1) {console.log("买车给"+who+who1);}
function buyPack(who,who1) {console.log("买房给"+who+who1);}
let man = new Man();
man.once("有钱",buyCar);  //{"有钱":[buyCar]}
man.on("有钱",buyPack);  //{"有钱":[buyCar,buyPack]}
man.removeListener("有钱",buyPack);
man.emit("有钱","小妹子","大妹子");
man.emit("有钱","小妹子","大妹子");
*/

//2.events 库 专门实现 事件的 是一个核心模块
let eventEmitter = require('events');
let util = require('util');
function Man() {}
util.inherits(Man,eventEmitter);
let man = new Man();
function buyCar(who,who1){console.log("买车给"+who+who1);}
function buyPack(who,who1){console.log("买房给"+who+who1);}
man.once("有钱",buyCar);  //{"有钱":[buyCar]}
man.on("有钱",buyPack);  //{"有钱":[buyCar,buyPack]}
man.removeListener("有钱",buyPack);
man.emit("有钱","小妹子","大妹子");
man.emit("有钱","小妹子","大妹子");