const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-body')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const routes = require('./routes/index')
const authority = require('./controllers/authority.js')
require('./config/db')

app.use(cors())

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  multipart: true,
  formidable: {
      maxFileSize: 200 * 1024 * 1024
  }
}))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 请求全局拦截,验证token
app.use(async (ctx, next) => {
  await authority.checkToken(ctx, next)
})

app.use(routes())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app
