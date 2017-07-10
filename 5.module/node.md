## 继承
1. 全部继承
```
child .prototype = new Parson;
extends + super
```
2. 只继承私有
```
function Child(){
    Parson.call(this,参数)
}
```
3. 只继承公有
```
Child.prototype.__proto__=Parson.prototype;
Child.prototype = Object.create(Person.prototype);
Object.setProtoTypeOf(child.prototype,Person.prototype);
```