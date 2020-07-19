/*
 * @Author: your name
 * @Date: 2020-07-04 15:12:58
 * @LastEditTime: 2020-07-18 12:42:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-win10-admin\server\model\role.js
 */ 
const initTable = require('../config/db')
const Sequelize = require('sequelize')
const moment = require('moment')
const shortid = require('shortid')

const role = initTable.define('db_role', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  role_id: {
    type: Sequelize.STRING(20),
    comment: '权限ID',
    defaultValue: shortid.generate,
  },
  name: {
    type: Sequelize.STRING(24),
    comment: '角色名称'
  },
  desc: {
    type: Sequelize.STRING(128),
    comment: '角色描述'
  },
  auth_ids: {
    type: Sequelize.TEXT('long'),
    comment: '角色权限id列表'
  },
  half_checked: {
    type: Sequelize.TEXT('long'),
    comment: '半选中角色权限id列表'
  },
  create_user: Sequelize.INTEGER(11),
  update_user: Sequelize.INTEGER(11),
  delete_user: Sequelize.INTEGER(11),
  delete_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get() {
      return moment(this.getDataValue('delete_time')).format('YYYY-MM-DD HH:mm')
    }
  },
  flag: {
    type: Sequelize.INTEGER(4),
    defaultValue: 1,
    comment: '状态: 0：删除，1：可用(默认为1)'
  }
}, {freezeTableName: true})

module.exports = role