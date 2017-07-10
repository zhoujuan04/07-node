class Man{
    constructor(){
        this._events={}
    }
    on(eventsName,callback){
        console.log(this._events[eventsName]);
        if(this._events[eventsName]){
            this._events[eventsName].push(callback);
        }else{
            this._events[eventsName]=[callback];
        }
    }
    emit(eventsName,...args){//
        if(this._events[eventsName]){
            //this._events[eventsName].forEach(item=>item)
            this._events[eventsName].forEach(item=>item.call(this,...args));
        }
    }
    removeListener(eventsName,callback){
        let arr=this._events[eventsName];
        if(arr){
            this._events[eventsName]=arr.filter(item=>{
                return item!==callback && item!==callback;
            })
        }
    }
    once(eventsName,callback){
        class one extends Man{
            constructor(){
                super(arguments);
                this.removeListener(eventsName,one);
            }
            //callback.apply();

        }
        this.on(eventsName,one);
        one.l=callback;
    }
}
class buyCar{
    constructor(who,who1){
        //super(who,who1);
        console.log("买车给"+who+who1);
    }
}
class buyPack{
    constructor(who,who1){
       // super(who,who1);
        console.log("买房给"+who+who1);
    }
}
let man = new Man();
man.on("有钱",buyCar);
man.on("有钱",buyPack);
//man.removeListener("有钱",buyPack);
man.emit("有钱","小妹子","大妹子");
man.emit("有钱","小妹子","大妹子");