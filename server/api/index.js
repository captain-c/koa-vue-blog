
const router = require('@koa/router')(); // 直接实例化router对象
const fs = require('fs');
const path = require('path');
const curDirFiles = fs.readdirSync(__dirname); // 读取当前目录

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