let str='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=%E7%88%B1%E5%A5%87%E8%89%BA&sugmode=2&json=1&p=3&sid=&req=2&bs=%E7%88%B1%E5%A5%87%E8%89%BA&pbs=%E7%88%B1%E5%A5%87%E8%89%BA&csor=3&pwd=a&cb=jQuery1102015169703336487972_1499588253022&_=1499588253024';

let url = require('url');
let {pathname,query} = url.parse(str,true);
console.log(pathname);
console.log(query);
