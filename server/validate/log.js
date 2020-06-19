const Base = require('./base')

class Log extends Base{
  constructor () {
    super()
    this.writeLog = this.writeLog.bind(this)
    this.getList = this.getList.bind(this)
  }
  async writeLog (req, res, next) {
    const params = req.body,
          arr = [
            {label: '日志来源', value: params.origin, rules: ['notnull']},
            {label: '日志类型', value: params.type, rules: ['notnull']}
          ],
          result = this.check(arr)
    if (!result.success) {
      res.json({
        code: 20301,
        success: false,
        message: result.message
      })
      return
    }
    next()
  }
  async getList (req, res, next) {
    const data = req.query,
          arr = [
            {label: 'curPage', value: data.curPage, rules: ['notnull', 'number']},
            {label: 'pageSize', value: data.curPage, rules: ['notnull', 'number']}
          ],
          result = this.check(arr)
    if (!result.success) {
      res.json({
        code: 20301,
        success: false,
        message: result.message
      })
      return
    }    
    next()
  }
}

module.exports = new Log()
