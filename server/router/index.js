// 方式一 路由文件名即路由前缀名
/**
 * generateRouter函数根据当前router目录生成对应文件名的路由，支持嵌套路由
 */

const router = require('@koa/router')(); // 直接实例化router对象
const path = require('path');
const generateRoutes = require('../util/generateRoutes');
const dirPath = path.join(__dirname); // 当前目录路径

generateRoutes(dirPath, '', (childDirName, fileName, reslovePath) => {
  router.use(`${childDirName ? `/${childDirName}` : ''}/${fileName}`, reslovePath.routes(), reslovePath.allowedMethods()); // 注册路由
});

// 网上看的
// const routeFiles = curDirFiles.filter(file => ~file.search(/^[^\.].*\.js$/)); // 过滤以点开头的js文件， ~按位取反，不知道为啥这么用

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