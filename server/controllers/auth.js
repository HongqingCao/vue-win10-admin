const AuthModel = require('../model/auth')
const logModel = require('../model/log')
const Authority = require('./authority')
const Role = require('./role')
const Op = require('sequelize').Op
const Base = require('./base')

class Auth extends Base{
  constructor () {
    super()
    this.getList = this.getList.bind(this)
    this.getAll = this.getAll.bind(this)
    this.created = this.created.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getList (ctx, next) {
    let oneUserRole, whereParams, data, menuList = [], authList = [], userInfo = await this.getUserInfo(ctx) || {}
    try {
      // 通过角色的权限id去获取 对应的权限表
      oneUserRole = await  Role.getRoleByUserId({role_id: userInfo.role_id})
      whereParams =  {
        flag: 1
      }
      oneUserRole.auth_ids && (whereParams['authority_id'] = {
        [Op.in]: oneUserRole.auth_ids.split(',')
      })
      data = await AuthModel.findAll({
        attributes: [
          'authority_id', 
          'authority_name', 
          'authority_type',
          'authority_url',
          'authority_sort',
          'desc',
          'parent_id',
          'parent_name'
        ],
        where:whereParams
      })
      
      data.map(item => {
        if (item.authority_type === 0) {
          menuList.push(item)
        }
        if (item.authority_type === 1) {
          authList.push(item.authority_url)
        }
      })
    }  catch (e) {
      this.handleException(ctx, e)
      return
    }
    ctx.body = {
      code: data ? 20000 : 1003,
      data: {
        menuList:menuList,
        authList:authList
      },
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
      data.update_user = userInfo.id
      result = await AuthModel.update(data, {where:{authority_id:data.authority_id}})
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

  async delete (ctx, next) {
    let  data = ctx.request.body
    console.log("data")
    console.log(data)
    const child = await AuthModel.findAll({
      where:{parent_id: data.authority_id, flag:1}
    })
    if (child && child.length > 0) {
      ctx.body = {
        code: 20001,
        success: false,
        message: '请先删除【' + data.authority_name + "】子节点下的权限"
      }
      return 
    }
    let result, userInfo = await this.getUserInfo(ctx) || {}
    data.flag = 0
    data.delete_user = userInfo.id
    data.delete_time = new Date()
    try {
      result = await AuthModel.update(data, {where:{authority_id:data.authority_id}})
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
            title: "删除权限",
            desc: "删除权限" + data.authority_url,
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


module.exports = new Auth()