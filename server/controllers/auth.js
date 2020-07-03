const AuthModel = require('../model/auth')
//const { where } = require('sequelize/types')
const getList = async (ctx) => {
  let type = ctx.request.query.type
  const data = await AuthModel.findAll({
    where: {
      flag: 1,
      authority_type: type
    }
  })
  ctx.body = {
    code: data ? 20000 : 1003,
    data: data,
    error:null,
    desc: data ? 'SUCCESS' : 'error'
  }
  console.log("dddddd")
  console.log(ctx.body)
}
const getAll = async (ctx) => {
  const data = await AuthModel.findAll({
    flag: 1
  })
  ctx.body = {
    code: data ? 20000 : 1003,
    data: data,
    error:null,
    desc: data ? 'SUCCESS' : 'error'
  }
}

module.exports = {
  getList,
  getAll
}