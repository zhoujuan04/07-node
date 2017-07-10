function Man() {this._events={}}
Man.prototype.on=function (eventsName,callback) {
    if(this._events[eventsName]){
        this._events[eventsName].push(callback);
    }else {
        this._events[eventsName]=[callback];
    }
};
Man.prototype.emit=function (eventsName,...args) {
    if(this._events[eventsName]){
        //console.log(this._events[eventsName]);
        this._events[eventsName].forEach(item=>item.call(this,...args))
        //this._events[eventsName].forEach(item=>item);
    }
};
Man.prototype.removeListener=function (eventsName,callback) {
    let arr = this._events[eventsName];
    if(arr){
        this._events[eventsName] = arr.filter(item=>{
            return item!==callback && item.l!==callback;
        })
    }
};
Man.prototype.once=function (eventsName,callback) {
    function one() {
        //console.log(arguments);
        callback.apply(this,arguments);
        this.removeListener(eventsName,one);
    }
    this.on(eventsName,one);
    one.l=callback;
};
function buyCar(who,who1) {
    console.log("买车给"+who);
}
function buyPack(ho,who1) {
    console.log("买房给"+who1);
}
let man = new Man();
man.once("有钱",buyCar);
man.on("有钱",buyPack);
//man.removeListener("有钱",buyPack);
man.emit("有钱","小妹子","大妹子");
man.emit("有钱","小妹子","大妹子");