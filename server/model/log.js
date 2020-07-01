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
  create_user: Sequelize.INTEGER(11),
  create_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm')
    }
  }
}, {freezeTableName: true})

module.exports = log