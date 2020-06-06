
const jwt = require('jsonwebtoken');
const { security } = require('../../config');

/**
 * 
 * @param {*} id 用户id
 */
function generateToken(id) {
  const { privateKey, expiresIn } = security;
  const token = jwt.sign({
    id
  },
  privateKey,
  {
    expiresIn: expiresIn
  });
  return token;
};

module.exports = {
  generateToken
};