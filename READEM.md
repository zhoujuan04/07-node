# 07-node
## module
- 文件模块 自己写的，引入模块 ../ ./
- 第三方模块 需要下载 引入时不需要加 ../ ./ 需要放在node_modules
- 内置模块 核心模块 人家给你写好的，用法和第三方模块一样，不需要下载 fs http
- commonjs 如何导出模块 如何创建模块 如何引用模块

```
let util = require('util'); //核心模块
//util是核心模块 inherits, js中的继承，只继承公有属性
function Person(name){
    this.name=name;
}
Person.prototype.dirnk='喝水';
function Gril(name,age){}
util.inherits(Gril,Person);
let girl = new Gril();
console.log(girl.age); //undefined ==>私有
console.log(girl.name); //undefined ==>私有
console.log(girl.dirnk); //喝水 ==>公有
```

> #### 1.只继承私有的

```
function Child(){
    Parent.call(this)
}
//相当于让父类在在子类中执行，将this改变成子类这样父类的私有属性就会被子类拿到
```


> #### 2.只继承公有的

- 方法一:通过__proto__实现继承
```
Gril.prototype.__proto__ = Person.prototype;
```

- 方法二:通过Object.create实现继承
```
function create(proto){
    function Fn(){}  //创建一个空函数
    Fn.prototype = proto;  //这个函数的公有属性，指向person公有
    return new Fn();  //new 出来的实例只有person的公有属性
}
Girl.prototype = create(Person.prototype);
//以上是模仿Object.create的实现过程
Gril.prototype = Object.create(Person.prototype);
let girl = new Girl();
console.log(girl.drink);
```

- 方法三:通过Object.setPrototypeOf实现继承 ==> 与方法差不多
```
Object.setProtoTypeOf(Child.prototype,Parent.prototype)
```

> #### 3.全部继承

- 方法一:通过new实例实现继承
```
Gril.prototype = new Person();
//让girl的原型指向person的实例，new父类时不能传递参数
```

- 方法二:extends + super

> #### 4.es6 extends class 全部继承

```
class Person{
    constructor(name){
        this.name=name;
    }
    //静态方法 只给类来调用
    static a(){
        console.log('static');
    }
    //原型上的方法，是实例来调用
    drink(){
        console.log('喝水');
    }
}
class Gril extends Person{
    constructor(name,age){
    //必须调用，相当于调用 父类函数,父类函数中的this指向girl
        super(name,age);
        this.age=age;
    }
}
let girl = new Gril("zf",8);
console.log(girl.age);
console.log(girl.name);
girl.drink();
Person.a();
```

### 类型判断
- typeOf
- instanceof
- constructor
- Object.prototype.toString.call
```
console.log(util.isArray({})); //返回的是boolean类型
```
### 基本数据类型
- string
- number
- boolean
- null
- undefined
- symbol
- Object

## "发布" "订阅" 模式
- on emit
- 订阅 维护关系的 一对多的关系
- 发布 找到一对多的关系

让绑定的事情依次解发
> 主要依赖的就是回调，失恋，哭，购物  {失恋:[哭,购物],男人有钱:[变坏,买车]}


#### 1. 模拟events的发布订阅
```
function Man() {this._events={}}
Man.prototype.on=function (eventsName,callback) {// {"有钱":[buyCar]}
    if(this._events[eventsName]){//第二次
        this._events[eventsName].push(callback);
    }else{//第一次
        this._events[eventsName]=[callback];
    }
};
Man.prototype.emit=function (eventsName,...args) {
    //(eventsName,...args)除了第一个将剩下的部分组成数组
    //...args 在参数中是剩余运算符，还可以用作展开运算
    if(this._events[eventsName]){
        //apply传递的数组，call传递的是一个个的
        //this._events[eventName].forEach(item=>item.apply(this,args));
        this._events[eventsName].forEach(item=>item.call(this,...args));//箭头函数this指向实例
    }
};
Man.prototype.removeListener=function (eventsName,callback) {
    //let arr = this._events[eventName];//取出数组，赋予给arr
    //if(arr)==> if(this._events[eventsName])
    if(this._events[eventsName]){
        //返回true 表示放到新数组，返回false表示不要他了，要改变的是对象中的数据，而不是新声明的数组
        //arr = arr.filter(cb=>cb!==callback);==>把改变的数组赋值给新赋值的arr的地址，并没有改变原来的数组的值，所以不能用arr=
        //this._events[eventName] = arr.filter(cb=>cb!==callback);
        this._events[eventsName]=this._events[eventsName].filter(item=>{
            return item!==callback && item.l!==callback;
            //可能item是one函数，如果自定义属性和当前传递的callback相同，表示也要删除掉
        });
    }
};
Man.prototype.once=function (eventsName,callback) {
    //先绑定，触发emit时，删除绑定的
    function one() {
        //触发one函数，调用原有执行的函数
        //function one()==>匿名函数谁执行one,this就指的是谁，所以是window，但是执行callback的时候是执行emit
        callback.apply(this,arguments);
        //这里不能使用call,arguments是个数组
        this.removeListener(eventsName,one);//执行后删除one函数
    }
    this.on(eventsName,one);//绑定的是one函数
    //this.on(eventName,callback); //==>绑定的时候将删除放在callback里面，以函数形式function one()
    one.l=callback;
};
function buyCar(who,who1) {console.log("买车给"+who+who1);}
function buyPack(who,who1) {console.log("买房给"+who+who1);}
let man = new Man();
//once作用是只触发一次
man.once("有钱",buyCar);  //{"有钱":[buyCar]} ==>订阅
man.on("有钱",buyPack);  //{"有钱":[buyCar,buyPack]} ==>订阅
man.removeListener("有钱",buyPack);
man.emit("有钱","小妹子","大妹子"); //==>发布
man.emit("有钱","小妹子","大妹子"); //==>发布
```

#### 2.events 库 专门实现 事件的 是一个核心模块
```
let eventEmitter = require('events');
let util = require('util');
function Man() {}
util.inherits(Man,eventEmitter);
let man = new Man();
function buyCar(who,who1){
    console.log("买车给"+who+who1);
}
function buyPack(who,who1){
    console.log("买房给"+who+who1);
}
man.once("有钱",buyCar);  //{"有钱":[buyCar]}
man.on("有钱",buyPack);  //{"有钱":[buyCar,buyPack]}
man.removeListener("有钱",buyPack);
man.emit("有钱","小妹子","大妹子");
man.emit("有钱","小妹子","大妹子");
```


#### 扩展1
```
let obj = {age:[1,2,3]};
let arr = obj.age;
//arr = [4,5,6]; //{ age: [ 1, 2, 3 ] }
obj.age = [4,5,6]; //{ age: [ 4, 5, 6 ] }
console.log(obj);

```

#### 扩展2
```
let obj1={name:1};
let obj2={age:5};
let obj3={...obj1,...obj2}; //es7里面使用，node不支持
```

#### 声明式forEach fonIn for of 的区别 钩子函数

## buffer
- 1.buffer 代表的是内存
- 2.node 为了操作二进制 生产出来的一个类型，buffer默认展示成16进制，可以和字符串无条件转化
- 2进制==>最大1   16进制==>最大f
- 字符串在node 中只支持urf-8格式
- 一个汉字utf-8有几个字节，3个字节
- 比字节小的单位 1个字节8个位组成==>1个汉字24位，每个位由二进制组成
- console.log(Math.pow(2, 8) - 1);
- 16进制最大值ff 代表10进制是255
- 当前位的最大值*进制^当前所在位减1

