const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {String} rootDirPath 路由根目录名，会作为路由前缀
 * @param {String} childDirName 子目录名，会作为路由前缀
 * @param {Function} callFn 回调函数 
 */
function generate(rootDirPath, childDirName, callFn) {
  const curDirFiles = fs.readdirSync(rootDirPath); // 读取指定的目录下所有文件，返回文件名组成的数组
  curDirFiles.forEach(file => { // 遍历
    const curPath = path.join(rootDirPath, `${file}`); // 当前文件路径
    const stat = fs.statSync(curPath); // fs.Stats类
    if (stat.isDirectory()) { // 当前是目录
      // 递归
      generate(curPath, file, callFn);
    } else {
      const fileName = file.substring(0, file.length - 3); // 获取文件名，这里都是.js文件结尾的js文件，不要用substr，官方已不推荐使用
      const reslovePath = require(curPath); // require对应的路由文件 
      if (fileName !== 'index') {
        // fileName 文件名作为路由前缀
        callFn(childDirName, fileName, reslovePath);
        // router.use(`${childDirName ? `/${childDirName}` : ''}/${fileName}`, reslovePath.routes(), reslovePath.allowedMethods()); // 注册路由
      }
    }
  });
};

module.exports = generate;