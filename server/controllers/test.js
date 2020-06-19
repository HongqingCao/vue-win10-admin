const test1 = async (ctx, next) => {
  const account = ctx.request.body
  console.log("account")
  console.log(account)
  next()
}
const test2 = async (ctx, next) => {
  const account = ctx.request.body.type
  if (account) {
    next()
  } else {
    console.log("中断")
  }
}
module.exports = {
  test1,
  test2
}