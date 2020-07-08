const initTable = require('../config/db')
const Sequelize = require('sequelize')
const moment = require('moment')

const user = initTable.define('db_user', {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    autoIncrement: true
  },
  role_id:Sequelize.STRING(20),
  account: Sequelize.STRING(100),
  name: Sequelize.STRING(100),
  password: Sequelize.STRING(256),
  type: {
    type: Sequelize.INTEGER(4),
    defaultValue:1,
    comment:'用户类型: 0: 系统注册 1: 管理平台添加 2:导入'
  },
  sex: Sequelize.INTEGER(4),
  avatar: {
    type: Sequelize.STRING(128),
    comment:'头像'
  }, 
  phone: Sequelize.INTEGER(24),
  status: {
    type: Sequelize.INTEGER(4),
    defaultValue:1,
    comment:'头像'
  }, 
  create_user: Sequelize.INTEGER(11),
  update_user: Sequelize.STRING(128),
  delete_user: Sequelize.STRING(128),
  delete_time: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('delete_time')).format('YYYY-MM-DD HH:mm')
    }
  },
  flag: {
    type: Sequelize.INTEGER(4),
    defaultValue:1,
    comment:'状态: 0：删除，1：可用(默认为1)'
  }
}, {freezeTableName: true})

module.exports = user