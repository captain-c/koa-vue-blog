// 执行建表操作，已弃用
const path = require('path');
const fs = require('fs');
const files = fs.readdirSync(path.join(__dirname));

files.forEach(file => {
  const fileName = file.substring(0, file.length - 3); // 获取文件名
  if (fileName !== 'index') {
    const model = require(path.join(__dirname, file))(); // 定义模型 
    model.sync({ force: false }); // 模型同步
  }
});