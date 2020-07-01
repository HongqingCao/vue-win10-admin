const AuthModel = require('../model/auth')
const getList = async (ctx) => {
  console.log("aaaaa")
  const data = await AuthModel.findAll({
    flag: 1
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

module.exports = {
  getList
}