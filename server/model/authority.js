const initTable = require('../config/db')
const Sequelize = require('sequelize')

const menu = initTable.define('db_authority', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  authority_id: Sequelize.INTEGER(11),
  authority_name: {
    type: Sequelize.STRING(48),
    comment: '权限名称'
  },
  authority_type: Sequelize.INTEGER(11),
  authority_sort: Sequelize.INTEGER(11),
  parent_id: Sequelize.INTEGER(11),
  parent_name:Sequelize.STRING(48),
  desc: {
    type: Sequelize.STRING(128),
    comment: '权限描述'
  },
  create_user: Sequelize.INTEGER(11),
  create_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm')
    }
  },
  update_user: Sequelize.INTEGER(11),
  update_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('update_time')).format('YYYY-MM-DD HH:mm')
    }
  },
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

module.exports = menu