
const Base = require('./base')
const UserModel = require('../model/user')
const ValidateUser  = require('../validate/user')
const logModel = require('../model/log')
const Authority = require('./authority')
const JWT = require('jsonwebtoken')
const { secret } = require('../config/config')

class User extends Base{
  constructor () {
    super()
    this.registered = this.registered.bind(this)
    this.login = this.login.bind(this)
    this.loginOut = this.loginOut.bind(this)
    // this.update = this.update.bind(this)
    // this.delete = this.delete.bind(this)
    // this.userInfo = this.userInfo.bind(this)
    // this.getRow = this.getRow.bind(this)
    // this.getList = this.getList.bind(this)
    // this.getAll = this.getAll.bind(this)
    // this.getPermissions = this.getPermissions.bind(this)
    // this.userTransfer = this.userTransfer.bind(this)
  }
  // 注册用户
  async registered (ctx, next) {
    console.log("ctx")
    console.log(ctx.request.body)
    let search, result, userInfo = await this.getUserInfo(ctx) || {}
    console.log(userInfo)
    // TODO: 需要做一个消息队列，保证注册时数据不会混乱
    // 查询用户是否存在
    try {
      search = await this.getUserByAccount({account: ctx.request.body.account, flag: 1})
    } catch (e) {
      this.handleException(ctx, e)
      return
    }
    // 用户不存在创建用户，存在则提示
    if (!search) {
      try {
        let data = JSON.parse(JSON.stringify(ctx.request.body))
        // TODO: 添加时有创建人, 注册时没有
        // 参数处理
        data.create_user = userInfo.id || 1,
        result = await UserModel.create(data)
      } catch (e) {
        this.handleException(ctx, e)
        return
      }

      try {
        await logModel.create({
            origin: ctx.request.body.type,
            type: 4,
            title: ctx.request.body.type === 2 ? '创建用户' : '注册用户',
            desc: '',
            ip: this.getClientIp(ctx),
            create_user: userInfo.id || 1,
        })
      } catch (e) {
        this.handleException(ctx, e)
      }

      ctx.body = {
        code: 20000,
        success: true,
        message: ctx.request.body.type === 2 ? '创建成功' : '注册成功'
      }
    } else {
      ctx.body = {
        code: 20001,
        success: false,
        message: '用户已存在'
      }
    }
  }

 // 登录
  async login (ctx, next) {
    console.log("ctx")
    console.log(ctx.request.body)
    await ValidateUser.login(ctx, next)
    let account = ctx.request.body.account,
        password = ctx.request.body.password,
        type = ctx.request.body.type,
        search, token = [], data
    // 查询用户名密码是否正确, 以及为用户设置登录成功后的token
    // TODO: 登录比较用户信息和token存储的信息是否一致，不一致需要重新设置token
    try {
      const where = {
        account:account,
        password:password,
        flag: 1
      }

      search = await UserModel.findOne({where})
      data = search ? JSON.parse(JSON.stringify(search)) : null
      if (data && data.status) {

        for (let key in data) {
          if (!data[key]) {
            delete data[key]
          }
        }
        // 得到要设置的token类型和过期时间
        switch (+type) {
          case 0:
            data.type = 'phone'
            data[data.type + '_expire_time'] = new Date(+new Date() + 60 * 60 * 24 * 180 * 1000) // 半年
            break
          case 1:
            data.type = 'user'
            data[data.type + '_expire_time'] = new Date(+new Date() + 60 * 60 * 24 * 60 * 1000) // 两个月
            break
          case 2:
            data.type = 'admin'
            data[data.type + '_expire_time'] = new Date(+new Date() + 60 * 60 * 24 * 1 * 1000) // 重新登录则上次的失效 (测试期间设置为一天后失效)
            break
        }
        try {
          // Token过期了或者用户登录获取到的信息和之前token解析出来的不一样，则重新设置，否则不处理
          let getIP = this.getClientIp(ctx)
          Authority.setToken(data, {
            set: {
              [data.type + '_token']: JWT.sign(data, secret, {}),
              [data.type + '_expire_time']: data[data.type + '_expire_time'],
              [data.type + '_ip']: getIP,
              user_id: data.id
            },
            get: {
              user_id: data.id
            }
          })
        } catch (e) {
          this.handleException(ctx, e)
          return
        }
      }
    } catch (e) {
      this.handleException(ctx, e)
      return
    }
    // 查询为空即用户信息不正确，不为空说明查询成功
    if (!search) {
     ctx.body = {
        code: 20301,
        success: false,
        message: '账号或密码错误'
      }
    } else if (search.status === 0) {
      ctx.body = {
        code: 20301,
        success: false,
        message: '当前账号已被停用'
      }
    } else {
      try {
        // 写入登录日志
      await logModel.writeLog({
          set: {
            origin: type,
            type: 1,
            title: '用户登录',
            desc: '',
            ip: this.getClientIp(ctx),
            create_user: search.id,
            create_time: new Date()
          }
        })
      } catch (e) {
        this.handleException(ctx, e)
      }
      try {
        console.log("111:" + data.id)
        token = await Authority.getToken({user_id: data.id})
        console.log("222")
      } catch (e) {
        this.handleException(ctx, e)
        return
      }
      ctx.body = {
        code: 20000,
        success: true,
        content: {},
        token: token ? token[data.type + '_token'] : '',
        message: '登录成功'
      }
    }
    console.log("ctx.body")
    console.log(ctx.body)
    next()
  }

  // 退出登录
  async loginOut (req, res, next) {
    let userInfo = await this.getUserInfo(req)
    // 设置Token过期时间为现在
    userInfo[req.query.type + '_expire_time'] = +new Date()
    try {
      // TODO: 测试期间不清除数据
      // await Authority.setToken(userInfo, {
      //   set: {[userInfo.type + '_token']: JWT.sign(userInfo, 'BBS', {}), user_id: userInfo.id}
      // })
    } catch (e) {
      this.handleException(req, res, e)
      return
    }
    try {
      let type = req.query.type === 'phone' ? 0 : req.query.type === 'bbs' ? 1 : 2
      // 写入登出日志
      await logModel.writeLog({
        set: {
          origin: type,
          type: 2,
          title: '用户登出',
          desc: '',
          ip: this.getClientIp(req),
          create_user: userInfo.id,
          create_time: new Date()
        }
      })
    } catch (e) {
      this.handleException(req, res, e)
    }
    res.json({
      code: 20000,
      success: true,
      content: {},
      message: '操作成功'
    })
  }
}
module.exports = new User()