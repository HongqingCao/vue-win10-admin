
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
    //this.loginOut = this.loginOut.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    // this.userInfo = this.userInfo.bind(this)
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
    // this.getPermissions = this.getPermissions.bind(this)
    // this.userTransfer = this.userTransfer.bind(this)
  }
  // 注册用户
  async registered (ctx, next) {
    let search, result, userInfo = await this.getUserInfo(ctx) || {}
    try {
      search = await this.getUserByAccount({account: ctx.request.body.account, flag: 1})
    } catch (e) {
      this.handleException(ctx, e)
      return
    }
    if (!search) {
      try {
        let data = JSON.parse(JSON.stringify(ctx.request.body))
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
            create_user: search.id
          }
        })
      } catch (e) {
        this.handleException(ctx, e)
      }
      try {
        token = await Authority.getToken({user_id: data.id})
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
    next()
  }

  async getList (ctx, next) {
    const { page = 1, pageSize = 10, status = 1, account='', phone='',role_id=''} = ctx.query

    try {
      let whereParams = {
        flag: 1,
        status:status
      }
      account && (whereParams['account'] = { [Op.like]: `%${account}%` })
      phone && (whereParams['phone'] = phone)
      role_id && (whereParams['role_id'] = role_id)

      let {count, rows}  = await UserModel.findAndCountAll({
        attributes: [
          'role_id', 
          'account',
          'name',
          'sex',
          'phone',
          'status'
        ],
        where:whereParams,
        offset: (page - 1) * Number(pageSize),
        limit: Number(pageSize)
      })
      ctx.body = {
        code: rows ? 20000 : 1003,
        data: {
          list: rows,
          pageData: {
            page: +page,
            pageSize: +pageSize,
            totals: count
          }
        },
        error:null,
        desc: rows ? 'SUCCESS' : 'error'
      }
    } catch (e) {
      this.handleException(ctx, e)
      return
    }
  }
  async getAll (ctx, next) {
    try {
      const data = await RoleModel.findAll({
        where: {
          flag: 1
        }
      })
      ctx.body = {
        code: data ? 20000 : 1003,
        data: data,
        error:null,
        desc: data ? 'SUCCESS' : 'error'
      }
    } catch (e) {
      this.handleException(ctx, e)
      return
    }
  }
  async update (ctx, next){
    let  data = ctx.request.body, result, userInfo = await this.getUserInfo(ctx) || {}
    try {
      data.update_user = userInfo.id
      result = await UserModel.update(data, {where:{account:data.account,flag: 1}})
    }  catch (e) {
      this.handleException(ctx, e)
      return
    }
    if (result) {
      try {
        await logModel.writeLog({
          set: {
            origin: ctx.body.type || 2,
            type: 4,
            title: "编辑用户",
            desc: "编辑权限" + data.account,
            ip: this.getClientIp(ctx),
            create_user: userInfo.id ||1
          }
        })
      } catch (e) {
        this.handleException(ctx, e)
      }
      ctx.body = {
        code: 20000,
        success: true,
        message: '操作成功'
      }
    } else {
      ctx.body = {
        code: 20001,
        success: false,
        message: '编辑失败'
      }
    }
  }
  async delete (ctx, next) {
    let  data = ctx.request.body
    let result, userInfo = await this.getUserInfo(ctx) || {}
    data.flag = 0
    data.delete_user = userInfo.id
    data.delete_time = new Date()
    try {
      result = await UserModel.update(data, {where:{account:data.account}})
    }  catch (e) {
      this.handleException(ctx, e)
      return
    }
    if (result) {
      try {
        await logModel.writeLog({
          set: {
            origin: ctx.body.type || 2,
            type: 4,
            title: "删除用户",
            desc: "删除用" + data.name,
            ip: this.getClientIp(ctx),
            create_user: userInfo.id ||1
          }
        })
      } catch (e) {
        this.handleException(ctx, e)
      }
      ctx.body = {
        code: 20000,
        success: true,
        message: '删除成功'
      }
    } else {
      ctx.body = {
        code: 20001,
        success: false,
        message: '删除失败'
      }
    }
  }
}
module.exports = new User()