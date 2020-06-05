/**
 * 参考教程： https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224
 * https://www.cnblogs.com/pzxnm/p/10500083.html
 * https://github.com/LFB/nodejs-koa-blog
 * 官方文档：https://github.com/demopark/sequelize-docs-Zh-CN
 * api文档：https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
 */
const Sequelize = require('sequelize');
const mysql = require('../../config/mysql');
const { DataTypes } = Sequelize;

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  dialect: 'mysql',
  // dialectOptions:{
  //   //字符集
  //   charset:'utf8mb4',
  //   collate:'utf8mb4_unicode_ci',
  //   supportBigNumbers: true,
  //   bigNumberStrings: true
  // },
  // pool: {
      // max: 5,
      // min: 0,
      // acquire: 30000,
      // idle: 10000
  // }
  timezone: '+08:00',  //东八时区
  define: {
    underscored: true, // 把驼峰命名转换为下划线
    charset: 'utf8',
    timestamps: true, 
    paranoid: true, // 定义为偏执表，删除表时是软删除，而不是硬删除，依赖timestamps为true时才有效
    createdAt: 'created_at', // 将默认的列名进行自定义名称
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
});

// 创建模型
sequelize.sync({force: false});
module.exports = {
  sequelize
}
