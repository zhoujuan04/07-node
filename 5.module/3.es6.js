class Person{
    //私有方法
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
        super(name,age);//必须调用，相当于调用 父类函数,父类函数中的this指向girl
        this.age=age;
    }
}
let girl = new Gril("zf",8);
console.log(girl.age);
console.log(girl.name);
girl.drink();
Person.a();