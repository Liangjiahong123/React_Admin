const { Sequelize } = require('sequelize');

// 连接数据库
const sequelize = new Sequelize('employee_db', 'root', 'Jh123.com', {
  host: 'localhost',
  dialect: 'mysql',
  logging: null // 不输出日志
});

module.exports = sequelize;
