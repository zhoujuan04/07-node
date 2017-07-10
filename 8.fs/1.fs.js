let fs=require('fs');
//fs里面的方法 同步 异步
//1.读取内容必需存在，不存在则报错
//2.读取内容默认都是buffer类型
let school={};
//方法一
/*
fs.readFile('name.txt','utf-8',function (err,data) {
    if(err) console.log(err);
    school.name = data;
    fs.readFile('age.txt','utf-8',function (err,data) {
        if(err) console.log(err);
        school.age = data;
        console.log(school);
    });
});
*/
//方法二
/*
let index=0;
fs.readFile('name.txt','utf-8',function (err,data) {
    if(err) console.log(err);
    school.name = data;
    index++;
    out();
});
fs.readFile('age.txt','utf-8',function (err,data) {
    if(err) console.log(err);
    school.age = data;
    index++;
    out();
});
function out() {if(index === 2){console.log(school);}}
 */

//方法三-->订阅发布
let EventEmitter = require('events');
let e = new EventEmitter();
fs.readFile('name.txt','utf-8',function (err,data) {
    if(err) console.log(err);
    school.name = data;
    e.emit("输出");
});
fs.readFile('age.txt','utf-8',function (err,data) {
    if(err) console.log(err);
    school.age = data;
    e.emit("输出");
});
function out() {
    if(Object.keys(school).length === 2) console.log(school);
}
e.on("输出",out);


/*同步方式  try{}catch(e){}
let name = fs.readFileSync('name.txt','utf-8');
let age = fs.readFileSync('age.txt','utf-8');
let school={name,age};
console.log(school);
*/