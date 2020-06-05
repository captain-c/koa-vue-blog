// const sequelize = require('../util/db');
// const { DataTypes } = require('sequelize');
// const sequelizeUser = require('../sql/create_user');

// const user = sequelizeUser(sequelize, DataTypes);
// user.sync({ force: false }); // 自动创建表
// const user = require('../sql/create_user')();
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');

class UserController {
  static async create(ctx) {
    // todo 验证器校验参数
    const formData = ctx.request.body; // 获取表单数据 
    const { name, password, email } = formData;
    const isRegister = await User.findOne({
      where: {
        name // 查找name/ 
      }
    });

    if (isRegister) {
      const result =  {
        code: -1,
        msg: '用户已存在'
      }
      ctx.body = result;
    } else {
      const user = new User();
      user.name = name;
      user.password = password;
      user.email = email;
      user.save();
        
      const result =  {
        code: 1,
        msg: '成功',
        result: {
          name: name
        }
      }
      ctx.body = result;
    }
  }

  static async verifyPwd(name, pwd) {
    // 查询用户
    const user = await User.findOne({
      where: {
        name
      }
    });

    if (!user) {

    }

    // 验证密码是否正确
    const correct = bcrypt.compareSync(pwd, user.password); // https://www.npmjs.com/package/bcrypt

    if (correct) {
      // 
    }
  }
}

module.exports = {
  UserController
};
