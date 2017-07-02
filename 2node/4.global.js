/*
1.只要在文件中，可以不用声明直接使用的，都叫全局对象
2.服务端没有window，点击事件，没有
4.因为配置过node，可以右健run，可以在命令行下执行某个文件
5.在命令行下 可以通过node +文件名执行
 */
//console.log(global);
/*

1.process
2.Buffer
3.clearImmediate setImmediate
4.setTimeout  clearTimeout
5.console -> log dir info error warn time/timeEnd
 */
//1)console
//new Date().getTime();
/*
console.time("a");
setTimeout(function(){
    console.timeEnd("a");
});
*/
//2)setTimeout callback 异步（事件环，node程序是事件环）
// Process finished with exit code 0(进程完成并退出)
/*function a(data){
    console.log(data);
}
setTimeout(function(data){
    a("你好");
},2000);===>*/
//**** console.log(this);//this==>{}，不是global
setTimeout(function(data){
    //this ==> 只得是setTime本身
    //console.log(data);
},0,"你好！","121212");
//你好,setTimeout可以传递参数，这里的this默认指向setTimeout自己,文件中直接打印this 是空对象

//3)setImmediate 立即 异步的 第二个小本上的
setImmediate(function(){
    //console.log("立即");
},1000);
//一般情况和不写时间的setTimeout是一样的

//4)process 进程，设置环境变量，生产环境production，开发环境dev
//在开发的时候输出，我很帅，上线的时候输出，我非常帅
//console.log(process.env);//environment 两个系统 mac window
//设置环境变量 通过set a=b 设置可以通过process.env取出来（吸在命令下使用），可以区分开发环境
if(process.env.NODE_ENV==="dev"){
    //console.log("我很帅");
}else {
    //console.log("我非常非常帅");
}

//服务端 全局变量global，挂载在global上的属性，可以直接获取，var声明的不会挂载在global上，为了解决模块化的问题
