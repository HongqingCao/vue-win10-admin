const initTable = require('../config/db')
const Sequelize = require('sequelize')

const user_role = initTable.define('db_user_role', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  role_id: Sequelize.INTEGER(11),
  user_id: Sequelize.INTEGER(11),
}, {freezeTableName: true})

module.exports = user_role