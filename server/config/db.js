/*
 * @Author: your name
 * @Date: 2020-07-04 15:12:57
 * @LastEditTime: 2020-07-12 19:30:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-win10-admin\server\config\db.js
 */ 
const Sequelize = require('sequelize');
const {
  dbName,
  host,
  port,
  user,
  password,
  timezone
} = require('./config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  timezone,
 // operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  query: { raw:true }
})
sequelize
  .authenticate()
  .then(() => {
    console.log('MYSQL 连接成功......');
  })
  .catch(err => {
    console.error('链接失败:', err);
  });
  
//根据模型自动创建表
// sequelize
//   .sync({alter: true} )
//   .then(() => {
//     console.log('init db ok')
//   })
//   .catch(err => {
//     console.log('init db error', err)
//   })

module.exports = sequelize