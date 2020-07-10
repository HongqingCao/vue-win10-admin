const logModel = require('../model/log')
const Base = require('./base')

class Log extends Base{
  constructor () {
    super()
    this.getAll = this.getAll.bind(this)
    this.delete = this.delete.bind(this)
  }
  async getAll (ctx, next) {
    const { page = 1, pageSize = 10 } = ctx.query
    let {count, rows}  = await logModel.findAndCountAll({
      attributes: [
        'id',
        'origin', 
        'type',
        'title',
        'desc',
        'create_name',
        'updatedAt'
      ],
      where: {
        flag: 1
      },
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
  }

  async delete (ctx, next) {
    let  data = ctx.request.body
    let result, userInfo = await this.getUserInfo(ctx) || {}
    data.flag = 0
    data.delete_user = userInfo.id
    data.delete_time = new Date()
    try {
      result = await logModel.update(data, {where:{id:data.id}})
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
            title: "删除日志",
            desc: "删除日志" + userInfo.name,
            ip: this.getClientIp(ctx),
            create_name: userInfo.name,
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


module.exports = new Log()