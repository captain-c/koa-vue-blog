// 方式一 路由文件名即路由前缀名
/**
 * generateRouter函数根据当前router目录生成对应文件名的路由，支持嵌套路由
 */

const router = require('@koa/router')(); // 直接实例化router对象
const fs = require('fs');
const path = require('path');
const curDirFiles = fs.readdirSync(__dirname); // 读取当前目录

// 网上看的
// const routeFiles = curDirFiles.filter(file => ~file.search(/^[^\.].*\.js$/)); // 过滤以点开头的js文件， ~按位取反，不知道为啥这么用
// curDirFiles.forEach(file => {
//   const fileName = file.substring(0, file.length - 3);
//   const reslovePath = path.join(__dirname, file);
//   if (fileName !== 'index') {
//     router.use('/${fileName}', reslovePath.routes(), reslovePath.allowedMethods())
//   }
// });

/**
 * 
 * @param {Array} files 目录下的所有文件 
 * @param {String} dirName 目录名
 * 注意__dirname是index.js所在的目录
 */
function generateRouter(files, dirName) {
  files.forEach(file => {
    const curPath = path.join(__dirname, `${ dirName ? `${dirName}/` : '' }${file}`); // 当前文件路径
    const stat = fs.statSync(curPath); // fs.Stats类
    if (stat.isDirectory()) { // 当前是目录
      // 递归
      const dirFiles = fs.readdirSync(curPath); // 读取当前目录
      generateRouter(dirFiles, file);
    } else {
      const fileName = file.substring(0, file.length - 3); // 获取文件名，这里都是.js文件结尾的js文件
      const reslovePath = require(path.join(__dirname, `${ dirName ? `${dirName}/` : '' }${file}`)); // require对应的路由文件
      if (fileName !== 'index') {
        router.use(`${dirName ? `/${dirName}` : ''}/${fileName}`, reslovePath.routes(), reslovePath.allowedMethods()); // 注册路由
      }
    }
  });
}

generateRouter(curDirFiles); // 生成路由

module.exports = router;

// 方式二 前缀路由
// const router = require('@koa/router')();

// const home = require('./home'); // 首页
// const auth = require('./auth'); // 登录
// const article = require('./article'); // 文章
// const admin = require('./admin'); // 后台页面

// router.use(home.routes(), home.allowedMethods());
// router.use(auth.routes(), auth.allowedMethods());
// router.use(article.routes(), article.allowedMethods());
// router.use('/admin', admin.routes(), router.allowedMethods());

// module.exports = router;