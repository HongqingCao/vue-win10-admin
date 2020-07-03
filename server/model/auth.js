const initTable = require('../config/db')
const Sequelize = require('sequelize')
const moment = require('moment')
const shortid = require('shortid')
const auth = initTable.define('db_auth', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  authority_id:  {
    type: Sequelize.STRING(20),
    defaultValue: shortid.generate
  },
  authority_name: {
    type: Sequelize.STRING(48),
    comment: '权限名称'
  },
  authority_type:  {
    type: Sequelize.INTEGER(11),
    comment: '权限类型: 0：菜单（默认0），1：操作和功能'
  },
  authority_url:  {
    type: Sequelize.STRING(128),
    comment: '权限标识'
  },
  authority_sort: Sequelize.INTEGER(11),
  parent_id:  {
    type: Sequelize.INTEGER(11),
    defaultValue: 0,
  },
  parent_name:Sequelize.STRING(48),
  desc: {
    type: Sequelize.STRING(128),
    comment: '权限描述'
  },
  create_user: Sequelize.INTEGER(11),
  update_user: Sequelize.INTEGER(11),
  delete_user: Sequelize.INTEGER(11),
  delete_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm')
    }
  },
  flag: {
    type: Sequelize.INTEGER(4),
    defaultValue: 1,
    comment: '状态: 0：删除，1：可用(默认为1)'
  },
}, {freezeTableName: true})

module.exports = auth