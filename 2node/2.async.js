let read = (callback)=>{
    setTimeout(()=>{
        let str = '我很帅';
        callback(str);//利用返回函数来调用
    },2000)
};
read(function(data){
    console.log(data);
});
//要解决异步问题，就是回调函数，将后续的逻辑当做参数传递给这个函数
//异步永远在同步之后执行，如果同步代码执行不能完成，异步永远不会触发
//非阻塞（厨师）是异步的前置条件
//IO：input（输入）从文件系统中读取文件，output（输出）向文件系统写入文件

//单线程 多线程==>node是基于js的
//java==>多线程同步
//node==>单线程异步==>js中的多线程H5--worker
//如果想开多线程，要开子进程

//多线程（感觉像同一时间干很多事情，快速的切换上下文），单线程

//箭头函数
/*
1.箭头函数不需要function声明
2.如果箭头后面是一个{}需要写return
     function a(b){
         return b;
     }
     let a = b=>{ return b};
3.this指向：箭头函数中没有this指向this
 */
/*function a(b){
    return function c(d){//c为匿名函数，所以调取不到
        return b+d;
    }
}*/
/*let a = b => d=> b+d;
console.log(a(1)(2));
//改变this 指向
//方法一:bind
let obj={
    a:function(){//this==>obj
        setTimeout(function(){
            console.log(this);//指向window
        }.bind(this))
    }
};
obj.a();
//方法二:()=>箭头函数
let obj={
    a:function(){//this==>obj
        setTimeout(()=>{
            console.log(this);//this指向obj
        })
    }
};
obj.a();
*/