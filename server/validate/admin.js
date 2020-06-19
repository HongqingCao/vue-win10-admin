const Base = require('./base')
const { cloneDeep } = require('lodash')

const login = async (ctx, next) => {
  const account = ctx.request.body.account,
        password = ctx.request.body.password,
        type = ctx.request.body.type,
        arr = [
          {label: '账号', value: account, rules: ['notnull', 'noChinese']},
          {label: '密码', value: password, rules: ['notnull']}
        ],
        result = Base.check(arr)
        console.log("result")
        console.log(result)
  if (!result.success) {
    ctx.body = {
    code: 20301,
    success: false,
    message: result.message
    }
    console.log(ctx.body)
    return
  }
  next()
}

module.exports = {
  login
}