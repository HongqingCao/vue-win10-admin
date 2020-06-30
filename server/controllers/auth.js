const Base = require('./base')
const AuthModel = require('../model/auth')
const Op = require('sequelize').Op

const loginIn = async (ctx) => {
  console.log('user')
  const user =JSON.parse(JSON.stringify( ctx.request.body))
  console.log(user)
  console.log(user.account)
  const data = await UserModel.findAll({
    account: user.account
  })
  ctx.body = {
    code: data ? 1000 : 1003,
    data: data,
    desc: data ? '登陆成功' : '账号或密码错误'
  }
  console.log(ctx.body)
}

module.exports = {
  loginIn
}