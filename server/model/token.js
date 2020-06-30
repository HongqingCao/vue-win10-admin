const initTable = require('../config/db')
const Sequelize = require('sequelize')
const moment = require('moment')
const token = initTable.define('db_token', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  user_id: Sequelize.INTEGER(11),
  admin_token: {
    type: Sequelize.STRING(1024),
    comment: ''
  },
  phone_token: {
    type: Sequelize.STRING(1024),
    comment: ''
  },
  user_token: {
    type: Sequelize.STRING(1024),
    comment: ''
  },
  admin_addr: {
    type: Sequelize.STRING(1024),
    comment: ''
  },
  phone_addr: {
    type: Sequelize.STRING(1024),
    comment: ''
  },
  user_addr: {
    type: Sequelize.STRING(1024),
    comment: ''
  },
  admin_ip: {
    type: Sequelize.STRING(1024),
    comment: ''
  },
  phone_ip: {
    type: Sequelize.STRING(1024),
    comment: ''
  },
  user_ip: {
    type: Sequelize.STRING(1024),
    comment: ''
  },
  admin_expire_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('admin_expire_time')).format('YYYY-MM-DD HH:mm')
    }
  },
  phone_expire_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('admin_expire_time')).format('YYYY-MM-DD HH:mm')
    }
  },
  user_expire_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('admin_expire_time')).format('YYYY-MM-DD HH:mm')
    }
  },
  flag: {
    type: Sequelize.INTEGER(4),
    defaultValue: 1,
    comment: '状态: 0：删除，1：可用(默认为1)'
  }
}, {freezeTableName: true})

module.exports = token