const initTable = require('../config/db')
const Sequelize = require('sequelize')
const moment = require('moment')
const log = initTable.define('db_log', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  origin: {
    type: Sequelize.INTEGER(4),
    comment: '日志来源: 0: 手机 1: 官网 2: 管理平台'
  },
  type: {
    type: Sequelize.INTEGER(4),
    comment: '日志类型: 1.用户登录 2. 用户登出 3. 菜单访问 4.功能操作'
  },
  title: {
    type: Sequelize.STRING(128),
    comment: '日志标题'
  },
  desc: {
    type: Sequelize.STRING(128),
    comment: '日志描述'
  },
  ip: {
    type: Sequelize.STRING(48),
    comment: '日志描述访问IP'
  },
  create_user: Sequelize.STRING(20),
  create_name: Sequelize.STRING(100),
  flag: {
    type: Sequelize.INTEGER(4),
    defaultValue: 1,
    comment: '状态: 0：删除，1：可用(默认为1)'
  }
}, {freezeTableName: true})

module.exports = log