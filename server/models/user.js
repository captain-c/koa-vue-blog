const bcrypt = require('bcryptjs'); // 第三方加密算法插件，生成60位的密文，md5是32位
const { sequelize } = require('../util/db');
const { DataTypes, Model } = require('sequelize');
const moment = require('moment');

// 定义用户模型
class User extends Model {

}

User.init({
  id: { // https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/model-basics.md
    type: DataTypes.INTEGER, // 数字
    primaryKey: true, // 主键
    autoIncrement: true // 自增
  },
  name: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: '用户名'
  },
  email: {
    type: DataTypes.STRING(64), // 字符串
    unique: false, // 是否允许重复
    allowNull: true, // 是否允许为null
    comment: '用户邮箱'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) { // 设置器 https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getters-setters-virtuals.md
      // 加密
      const salt = bcrypt.genSaltSync(10);
      // 生成加密密码
      const pwd = bcrypt.hashSync(val, salt);
      this.setDataValue("password", pwd);
    },
    // field: 'password',
    comment: '用户密码'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}, { // https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/model-basics.md
  sequelize, // 连接实例
  modelName: 'user', // 模型名称
  tableName: 'user' // 表名
});


module.exports = {
  User
}