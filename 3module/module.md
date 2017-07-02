## 模块化
- js中实现模块化，单例，闭包
- 单例 缺点：不能保证一定不冲突，会导致调用过长，require(AMD),seajs(CMD),import export，不兼容
- 没有块级作用域

## node自带模块化 commonjs规范
- 怎么定义一个模块 （每个js都是一个模块，在每个文件外面增加一个闭包，创建每一个js都会自自己生成一个闭包）
- 如何导出一个模块 （module.exports/exports）
- 如何引用一个模块  require()

## 模块分类
- 内置模块,核心模块 node自带
- 自定义模块 自己写的模块
- 第三方模块 别人写的，需要下载 npm下载模块
    - 全局安装(只能在命令行下使用，会提供你一个全局命令，代码里不能使用)
        - npm install nrm -g  nrm==>切换源的工具
        - nrm test
        - nrm use cnpm
    - 本地安装(在当前项目下使用)
        - --save-dev 开发依赖（）

> npm node package manager 管理node的包（很多js文件）的安装node自带npm 买node送npm