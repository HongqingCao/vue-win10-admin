const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-body')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const routes = require('./routes/index')
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
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(routes())
app.listen(3001, () => {
  console.log('Koa is listening in 3001')
})
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
