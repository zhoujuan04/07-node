//promise 承诺 -> 永远没有结果 -> 等待 -> 成功（resolve） -> 失败(reject)
//promise 在node中天生支持  构造函数  ==>es6的方法
let fs = require('fs');
function read(url) {
    return new Promise(function (resolv,reject) {
        fs.readFile(url,'utf-8',function (err,data) {
            if(err)reject(err);
            resolv(data);
        })
    })
}
//解决了回调函数 then catch resolve  reject
//在all方法中都成功才成功，有一个失败就失败了
Promise.all([read('name.txt'),read('age.txt')]).then(function ([name,age]) {
    let school = {name,age};
    console.log(school);
},function (err) {
    console.log(err);
});
/*read('name.txt').then(function (data) {
    console.log(data);
},function (err) {
    console.log(err);
});*/

/*function buyPack() {
    return new Promise(function (resolve,reject) {
        setTimeout(function () {
            if(Math.random()*10>5){
                resolve("ok");
            }else{
                reject("no");
            }
        },500)
    })
}
buyPack().then(function (data) {
    console.log(data);
},function (data) {
    console.log(data);
});*/
//可以使用catch
/*buyPack().then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.log(err);
});*/


//http://www.zhufengpeixun.cn/docs/html/node%E5%9F%BA%E7%A1%80/butter.html
