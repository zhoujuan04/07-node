//extends 是继承私有还是公有  super
function Person(name) {
    this.name=name;
}
Person.prototype.drink='喝水';
Person.a=function () {
    console.log('static');
};
function Gril(name,age) {
    Person.call(this,name,age);
    this.age=age;
}
Gril.prototype.__proto__=Person.prototype;
let girl = new Gril(1,2);
console.log(girl.age);
console.log(girl.name);
console.log(girl.drink);