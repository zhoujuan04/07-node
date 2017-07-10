let fs=require('fs');
/**
 *
 * @param source 代表要拷贝的文件
 * @param target 拷贝出的文件
 */
function copySync(source,target) {
    //1.先读取source,在写入target
    //2.readFileSync writeFileSync
    let file = fs.readFileSync(source);
    fs.writeFileSync(target,file)
}
try{
    copySync('1.txt','3.txt');
}catch (e){
    console.log(e);
}

function copy(source,target,callback) {
    //1.先读取source,在写入target
    //2.readFile writeFile
    //utf-8==>是为读取的时候转码，在一读一写时不需要知道内容，可以不写
    fs.readFile(source,function (err,data) {
        //console.log(data);
        if(err) return callback(err);
        //如果有错误将错误传递给callback 结束
        fs.writeFile(target,data,function (err) {
            callback(err);
        })
    })
}
copy('1.txt','3.txt',function (err) {
    console.log(err);
});

//虽然改写了异步，但仍然解决不了大文件读写的问题，会淹没内存，希望边读边写===流帮我们解决这种边读边写的问题，gulp基于流的
