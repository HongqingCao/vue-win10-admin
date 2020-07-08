const RoleModel = require('../model/role')
const UserModel = require('../model/user')
const logModel = require('../model/log')
const Base = require('./base')

class Role extends Base{
  constructor () {
    super()
    this.getAll = this.getAll.bind(this)
    this.created = this.created.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }
  async getAll (ctx, next) {
    const data = await RoleModel.findAll({
      attributes: [
        'role_id', 
        'name',
        'desc',
        'auth_ids'
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
      search = await RoleModel.findOne({
               where: { 
                name: data.name, 
                  flag: 1
                }
              })
    } catch (e) {
      this.handleException(ctx, e)
      return
    }

    if (!search) {
      try {
        data.create_user = userInfo.id || 1
        result = await RoleModel.create(data)
      } catch (e) {
        this.handleException(ctx, e)
        return
      }
      try {
        await logModel.writeLog({
          set: {
            origin: ctx.body.type || 2,
            type: 4,
            title: "创建角色",
            desc: "创建角色" + data.name,
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
        message:  data.name +'角色已存在'
      }
    }
  }

  async update (ctx, next){
    let  data = ctx.request.body, result, userInfo = await this.getUserInfo(ctx) || {}
    try {
      data.update_user = userInfo.id
      result = await RoleModel.update(data, {where:{role_id:data.role_id}})
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
            desc: "编辑权限" + data.name,
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
    const child = await UserModel.findAll({
      attributes: [
        'id'
      ],
      where:{role_id: data.role_id, flag:1}
    })
    if (child && child.length > 0) {
      ctx.body = {
        code: 20001,
        success: false,
        message: `存在${child.length}个绑定用户,请先解除绑定`
      }
      return 
    }
    let result, userInfo = await this.getUserInfo(ctx) || {}
    data.flag = 0
    data.delete_user = userInfo.id
    data.delete_time = new Date()
    try {
      result = await RoleModel.update(data, {where:{role_id:data.role_id}})
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
            title: "删除角色",
            desc: "删除角色" + data.name,
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


module.exports = new Role()