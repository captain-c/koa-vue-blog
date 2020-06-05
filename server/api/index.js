
const router = require('@koa/router')(); // 直接实例化router对象
const path = require('path');
const generateRoutes = require('../util/generateRoutes');
const dirPath = path.join(__dirname); // 当前目录路径

// generateRoutes(router, dirPath);
generateRoutes(dirPath, '', (childDirName, fileName, reslovePath) => {
  router.use(`/api${childDirName ? `/${childDirName}` : ''}/${fileName}`, reslovePath.routes(), reslovePath.allowedMethods()); // 注册路由
});

module.exports = router;