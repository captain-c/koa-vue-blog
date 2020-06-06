// const sequelize = require('../util/db');
// const { DataTypes } = require('sequelize');
// const sequelizeUser = require('../sql/create_user');

// const user = sequelizeUser(sequelize, DataTypes);
// user.sync({ force: false }); // 自动创建表
// const user = require('../sql/create_user')();
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { generateToken } = require('../util/generateToken');

class UserController {
  // 创建用户
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
      // ctx.response.status = 200;
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
      ctx.response.status = 200;
      ctx.body = result;
    }
  }

  static async verifyPwd(name, pwd) {
    // 查询用户
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { name },
          { email: name }
        ]
      }
    });

    if (!user) {
      return {
        code: 0,
        msg: '用户不存在'
      };
    }

    // 验证密码是否正确
    const correct = bcrypt.compareSync(pwd, user.password); // https://www.npmjs.com/package/bcrypt

    if (!correct) {
      return {
        code: 0,
        msg: '密码不正确'
      };
    }

    const { id, email } = user;
    const token = generateToken(user.id); // 生成token
    return {
      code: 1,
      msg: '成功',
      result: {
        token,
        id,
        email,
        name: user.name
      }
    };
  }
  // 登录逻辑
  static async login(ctx) {
    const formData = ctx.request.body; // 获取表单数据 
    const { name, password } = formData;
    const user = await UserController.verifyPwd(name, password);
    // const { code } = user
    ctx.response.status = 200;
    ctx.body = user;
  }
  // 用户信息
  static async getInfo(ctx) {
    const { id } = ctx.params; // 获取参数
    const user = await User.findOne({
      where: {
        id // 查找name/ 
      }
    });
    ctx.body = user;
  }
}

module.exports = {
  UserController
};
