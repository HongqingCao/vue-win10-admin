const Base = require('./base')

const registered = async (ctx, next) => {
  let data = ctx.request.body
  const account = data.account,
        password = data.password,
        type = data.type,
        arr = [
          {label: '账号', value: account, rules: ['notnull', 'noChinese']},
          {label: '密码', value: password, rules: ['notnull']},
          {label: '账号类型', value: type, rules: ['notnull', 'number']}
        ],
        result = Base.check(arr)
  if (!result.success) {
    ctx.body = {
      code: 20301,
      success: false,
      message: result.message
    }
    return
  }
  next()
}
const login = async (ctx, next) => {
  let data = ctx.request.body
  const account = data.account,
        password = data.password,
        type = data.type,
        arr = [
          {label: '账号', value: account, rules: ['notnull', 'noChinese']},
          {label: '密码', value: password, rules: ['notnull']},
          {label: '账号类型', value: type, rules: ['notnull', 'number']}
        ],
        result = Base.check(arr)
  if (!result.success) {
    ctx.body = {
      code: 20301,
      success: false,
      message: result.message
    }
    return
  }
  next()
}

module.exports = {
  registered,
  login
}