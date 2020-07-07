const AuthModel = require('../model/auth')
const logModel = require('../model/log')
const Base = require('./base')

class Auth extends Base{
  constructor () {
    super()
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
    this.created = this.created.bind(this)
    this.update = this.update.bind(this)
  }

  async getList (ctx, next) {
    let type = ctx.request.query.type
    const data = await AuthModel.findAll({
      where: {
        flag: 1,
        authority_type: type
      }
    })
    ctx.body = {
      code: data ? 20000 : 1003,
      data: data,
      error:null,
      desc: data ? 'SUCCESS' : 'error'
    }
  }

  async getAll (ctx, next) {
    const data = await AuthModel.findAll({
      attributes: [
        'authority_id', 
        'authority_name',
        'authority_type',
        'authority_url',
        'authority_sort',
        'parent_id',
        'parent_name',
        'desc'
      ],
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
  }

  async created (ctx, next) {

    let data = JSON.parse(JSON.stringify(ctx.request.body)), search, result, userInfo = await this.getUserInfo(ctx) || {}
    try {
      search = await AuthModel.findOne({
               where: { 
                  authority_url: data.authority_url, 
                  flag: 1
                }
              })
      console.log(search)
    } catch (e) {
      this.handleException(ctx, e)
      return
    }

    if (!search) {
      try {
        data.create_user = userInfo.id || 1
        result = await AuthModel.create(data)
      } catch (e) {
        this.handleException(ctx, e)
        return
      }
      try {
        await logModel.writeLog({
          set: {
            origin: ctx.body.type || 2,
            type: 4,
            title: "创建权限",
            desc: "创建权限" + data.authority_name,
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
        message: '创建成功'
      }
    } else {
      ctx.body = {
        code: 20001,
        success: false,
        message:  data.authority_url +'权限已存在'
      }
    }
  }

  async update (ctx, next){
    let  data = ctx.request.body, result, userInfo = await this.getUserInfo(ctx) || {}
    try {
      result = await AuthModel.update(data, {where:{authority_id:data.authority_id}})
      console.log(result)
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
            title: "编辑权限",
            desc: "编辑权限" + data.authority_url,
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
}


module.exports = new Auth()