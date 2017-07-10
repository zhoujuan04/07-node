function Man() {this._events={}}
Man.prototype.on=function (eventName,callback) {
    if(this._events[eventName]){//第二次
        this._events[eventName].push(callback);
    }else{//第一次
        this._events[eventName]=[callback];
    }
};
//声明式forEach fonIn for of 的区别 钩子函数
/* 扩展：
* let obj1={name:1};
* let obj2={age:5};
* let obj3={...obj1,...obj2}; //es7里面使用，node不支持
* */
Man.prototype.emit=function (eventName,...args) {//除了第一个将剩下的部分组成数组
    //console.log(args);
    //在参数中是剩余运算符，还可以用作展开运算
    if(this._events[eventName]){
        //apply传递的数组，call传递的是一个个的
        //this._events[eventName].forEach(item=>item.apply(this,args));
        this._events[eventName].forEach(item=>item.call(this,...args));//箭头函数this指向实例
    }
};
Man.prototype.removeListener=function (eventName,callback) {
    let arr = this._events[eventName];//取出数组，赋予给arr
    if(arr){
        //返回true 表示放到新数组，返回false表示不要他了，要改变的是对象中的数据，而不是新声明的数组
        //arr = arr.filter(cb=>cb!==callback);==>把改变的数组赋值给新赋值的arr的地址，并没有改变原来的数组的值，所以不能用arr=
        //this._events[eventName] = arr.filter(cb=>cb!==callback);
        this._events[eventName] = arr.filter(cb=>{
            return cb!==callback && cb.l!==callback;//可能item是one函数，如果自定义属性和当前传递的callback相同，表示也要删除掉
        });
    }
};
Man.prototype.once=function (eventName,callback) {
    //先绑定，触发emit时，删除绑定的
    function one() {//触发one函数，调用原有执行的函数
        //debugger;
        //console.log(this);
        //function one()==>匿名函数谁执行one,this就指的是谁，所以是window，但是执行callback的时候是执行emit
        callback.apply(this,arguments); //这里不能使用call,arguments是个数组
        //console.log(arguments);
        //callback.apply(this,arguments);//buyCar
        this.removeListener(eventName,one);//执行后删除one函数
    }
    this.on(eventName,one);//绑定的是one函数
    //this.on(eventName,callback); //==>绑定的时候将删除放在callback里面，以函数形式function one()
    one.l=callback;
};
let man = new Man();
function buyCar(who,who1) {
    console.log("buyCar"+who);
}
function buyPack(who,who1) {
    console.log("buyPack"+who1);
}
//once作用是只触发一次
man.once('有钱',buyCar); //{'有钱':[buyCar]} ==>订阅
man.on('有钱',buyPack); //{'有钱':[buyCar,buyPack]} ==>订阅
//man.emit('有钱','买衣服'); //{'有钱':[buyCar,buyPack]}
man.removeListener('有钱','买车');
man.emit('有钱','妹子','妹子1');  //==>发布
man.emit('有钱','妹子','妹子1');  //==>发布

/*let obj = {age:[1,2,3]};
let arr = obj.age;
//arr = [4,5,6]; //{ age: [ 1, 2, 3 ] }
obj.age = [4,5,6];//{ age: [ 4, 5, 6 ] }
console.log(obj);*/

//将以上代码转化成es6