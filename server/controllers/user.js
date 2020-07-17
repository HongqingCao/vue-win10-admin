
const Base = require('./base')
const UserModel = require('../model/user')
const ValidateUser  = require('../validate/user')
const logModel = require('../model/log')
const Authority = require('./authority')
const JWT = require('jsonwebtoken')
const MD5 = require('js-md5')
const Op = require('sequelize').Op
const { secret } = require('../config/config')

class User extends Base{
  constructor () {
    super()
    this.registered = this.registered.bind(this)
    this.login = this.login.bind(this)
    this.logOut = this.logOut.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.getInfo = this.getInfo.bind(this)
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
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
        let data = ctx.request.body
        data.password = MD5(data.password) 
        data.create_user = userInfo.user_id || 1,
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
          create_user: userInfo.user_id || 1,
          create_name: userInfo.name || ''
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
    // 验证登录信息是否合法
    await ValidateUser.login(ctx, next)

    let account = ctx.request.body.account,
        password = MD5(ctx.request.body.password),
        type = ctx.request.body.type,
        search, token = [], data
       
    search = await UserModel.findOne({
                where:{
                  account:account,
                  password:password,
                  flag: 1
                }
              })

    data = search ? JSON.parse(JSON.stringify(search)) : null
    console.log("user_id")
    console.log(data.user_id)
    if (data) {
      if (data.status == 0) {
        ctx.body = {
          code: 20301,
          success: false,
          message: '当前账号已被停用'
        }
        return
      }
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
          data[data.type + '_expire_time'] = new Date(+new Date() + 60 * 60 * 24 * 1 * 1000) // 一天
        // data[data.type + '_expire_time'] = new Date(+new Date() + 60 * 1000) // 重新登录则上次的失效 (测试期间设置为1分钟后失效)
          break
      }

      try {
        
        // Token过期了或者用户登录获取到的信息和之前token解析出来的不一样，则重新设置，否则不处理
        await Authority.setToken(data, {
          set: {
            [data.type + '_token']: JWT.sign(data, secret, {}),
            [data.type + '_expire_time']: data[data.type + '_expire_time'],
            [data.type + '_ip']: this.getClientIp(ctx),
            user_id: data.user_id
          },
          get: {
            user_id: data.user_id
          }
        })
       
      } catch (e) {
        this.handleException(ctx, e)
        return
      }

      try {
        await logModel.writeLog({
          set: {
            origin: type,
            type: 1,
            title: '用户登录',
            desc: '',
            ip: this.getClientIp(ctx),
            create_user: search.user_id || '',
            create_name: search.name || ''
          }
        })
      } catch (e) {
        this.handleException(ctx, e)
      }

      try {
        console.log("54445555")
        token = await Authority.getToken({user_id: data.user_id})
        console.log("55555")
      } catch (e) {
        this.handleException(ctx, e)
        return
      }

      console.log(token)

      ctx.body = {
        code: 20000,
        success: true,
        content: {},
        token: token ? token[data.type + '_token'] : '',
        message: '登录成功'
      }
    } else {
      ctx.body = {
        code: 20301,
        success: false,
        message: '账号或密码错误'
      }
    }  
  }
// 退出登录
  async logOut (ctx, next) {
    let userInfo = await this.getUserInfo(ctx)
    // 设置Token过期时间为现在
    userInfo[ctx.query.type + '_expire_time'] = +new Date()
    try {
      // TODO: 测试期间不清除数据
      await Authority.setToken(userInfo, {
        set: {[userInfo.type + '_token']: JWT.sign(userInfo, secret, {}), user_id: userInfo.user_id}
      })
    } catch (e) {
      this.handleException(ctx, e)
      return
    }
    try {
      let type = ctx.query.type === 'phone' ? 0 : ctx.query.type === 'user' ? 1 : 2
      // 写入登出日志
      await logModel.writeLog({
        set: {
          origin: type,
          type: 2,
          title: '用户登出',
          desc: '',
          ip: this.getClientIp(ctx),
          create_user: userInfo.id
        }
      })
    } catch (e) {
      this.handleException(ctx, e)
    }
    ctx.body = {
      code: 20000,
      success: true,
      data: {},
      message: '操作成功'
    }
  }
  async getInfo (ctx, next) {
    let userInfo = await this.getUserInfo(ctx)
    let where = {
      id:userInfo.id,
       flag: 1
    }
    const search = await UserModel.findOne({where})
    if (search) {
      ctx.body = {
        code: 20000,
        success: true,
        data: search,
        message: '操作成功'
      }
    } else {
      ctx.body = {
        code: 20401,
        success: false,
        data: {},
        message: '用户不存在'
      }
    }
  }
  async getList (ctx, next) {
    const { page = 1, pageSize = 10, status ='', account='', phone='',role_id=''} = ctx.query

    try {
      let whereParams = {
        flag: 1
      }
      account && (whereParams['account'] = { [Op.like]: `%${account}%` })
      phone && (whereParams['phone'] = phone)
      role_id && (whereParams['role_id'] = role_id)
      status && (whereParams['status'] = status)
      let {count, rows}  = await UserModel.findAndCountAll({
        attributes: [
          'user_id', 
          'role_id', 
          'role_name',
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
    let  data = JSON.parse(JSON.stringify(ctx.request.body)), result, userInfo = await this.getUserInfo(ctx) || {}
    data.password && (data.password = MD5(data.password))
    try {
      data.update_user = userInfo.user_id
      result = await UserModel.update(data, {where: {user_id:data.user_id}})
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
            desc: "编辑用户" + data.account,
            ip: this.getClientIp(ctx),
            create_user: userInfo.id ||1, 
            create_name: userInfo.name || ''
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
      result = await UserModel.update(data, {where:{user_id:data.user_id}})
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
            create_user: userInfo.id ||1,
            create_name: userInfo.name || ''
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