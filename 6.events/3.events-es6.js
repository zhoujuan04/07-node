let EventEmitter = require('events');
//let util = require('util');
class Man extends EventEmitter{
    constructor(){
        super();
        this._events={}
    }
}
class buyCar{
    constructor(who,who1){
        console.log("买车给"+who+who1);
    }
}
class buyPack{
    constructor(who,who1){
        console.log("买房给"+who+who1);
    }
}
//util.inherits(Man,EventEmitter);

let man=new Man();
man.once("有钱",buyCar);
man.on("有钱",buyPack);
man.removeListener("有钱",buyPack);
man.emit("有钱","大妹子","小妹子");
man.emit("有钱","大妹子","小妹子");