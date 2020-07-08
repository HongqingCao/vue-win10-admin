const initTable = require('../config/db')
const Sequelize = require('sequelize')

const userRole = initTable.define('db_user_role', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  role_id: Sequelize.STRING(20),
  user_id: Sequelize.BIGINT(20)
}, {freezeTableName: true})

module.exports = userRole