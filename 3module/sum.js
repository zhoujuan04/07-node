function sum(){
    //类数组如何转换数组
    //1.Array.from(arguments);
    //2.[].slice.call(arguments);
    //3.arguments.forEach();
    /*let total=0;
     ary.forEach(item=>total+=item);
     return total;*/
    let total=0;
    for(let i=0;i<arguments.length;i++){
        total+=arguments[i];
    }
    return total;
}
//1.exports.sum=sum;
//2.module.exports=sum;
//3.module.exports.sum=sum;
//4.global.sum=sum;//如果是global的引用的时候不用赋值