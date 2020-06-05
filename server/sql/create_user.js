// 弃用
const { db, dataTypes } = require('../util/db');

function generateTable() {
  return db.define('user', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: true
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
      field: 'password'
    }
  }, {
    timestamps: false
  });
}

module.exports = generateTable;