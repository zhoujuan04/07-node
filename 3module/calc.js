/*let obj={//对象中的函数：和function关键字，可以省略
    "+"(a,b){
        return a+b;
    },
    "-"(a,b){
        return a-b;
    }
};
exports.obj=obj;*/
let a='b';
let obj={
    //a:1 //a==>键值对不能修改
    [a]:1 //a==>加上[]为赋值变量
};
console.log(obj);

