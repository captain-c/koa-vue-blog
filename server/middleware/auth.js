const jwt = require('jsonwebtoken');
const { security } = require('../../config');

function parseToken(str) {
  const prefixStr = `Bearer `;
  return str.substring(prefixStr.length);
}

function checkToken() {
  return async (ctx, next) => {
    try {
      const token = parseToken(ctx.header.authorization || '');
      const result = jwt.verify(token, security.privateKey);
      console.log(result);
    } catch(error) {

    }

    await next(); // 继续执行
  }
}

module.exports = {
  checkToken
};