const fs = require('fs')
const path  = require('path')
const utils  = require('../utils/utils')
const schedule  = require('node-schedule')

class Log {
  constructor () {
    this.clearLog(7)
  }
  /**
   * 写入日志
   * @param {String} type // 日志类型 err 错误日志 sql sql日志
   * @param {String} content 
   */
  async writeLog (content, type = 'err') {
    // 创建不存在的文件夹
    await this.dirExists(`log/file/${type}`)
    // 获取到文件files
    // fs.readFile(`log/file/${type}/${utils.switchTime(new Date(), 'YYYY-MM-DD')}.log`, (err, data) => {
    //   if (err) {
    //     console.log(err)
    //   }
    //   // 写入文件
    //   fs.writeFile(`log/file/${type}/${utils.switchTime(new Date(), 'YYYY-MM-DD')}.log`, `${data || ''}\n${content}`, async (err) => {
    //     if (err) {
    //       console.log(err)
    //     }
    //   })
    // })
     // 写入文件
     fs.appendFile(`log/file/${type}/${utils.switchTime(new Date(), 'YYYY-MM-DD')}.log`, `\n${content}`, async (err) => {
      if (err) {
        console.log(err)
      }
    })
  }
  // 定时清除日志
  async clearLog (day) {
    // 创建不存在的文件夹
    await this.dirExists(`log/file/sql`)
    await this.dirExists(`log/file/err`)
    const rule = new schedule.RecurrenceRule()
　　rule.dayOfWeek = [0, new schedule.Range(1, 6)]
　　rule.hour = 11;
　　rule.minute = 54;
　　schedule.scheduleJob(rule, () => {
      const sqlLogList = fs.readdirSync('log/file/sql')
      const errLogList = fs.readdirSync('log/file/err')
      const NOW = +new Date()
      sqlLogList.forEach(item => {
        const logDate = +new Date(item.replace('.log', ''))
        if (NOW - day * 24 * 3600 * 1000 > logDate) {
          fs.unlinkSync('log/file/sql/' + item)
        }
      })
      errLogList.forEach(item => {
        const logDate = +new Date(item.replace('.log', ''))
        if (NOW - day * 24 * 3600 * 1000 > logDate) {
          fs.unlinkSync('log/file/err/' + item)
        }
      })
　　  console.log('每天定时删除不符合条件的文件')
　　})
  }
  // 查询路径是否存在
  async getStat (path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          resolve(false)
        } else {
          resolve(stats)
        }
      })
    })
  }
  // 创建路径
  async mkdir(dir){
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, err => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
  // 路径是否存在，不存在则创建
  async dirExists (dir) {
    let isExists = await this.getStat(dir), tempDir, status, mkdirStatus
    // 如果该路径存在且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
      return true
    } else if (isExists) { // 如果该路径存在但是文件，返回false
      return false
    }
    // 如果该路径不存在
    tempDir = path.parse(dir).dir // 拿到上级路径
    // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    status = await this.dirExists(tempDir)
    if (status) {
      mkdirStatus = await this.mkdir(dir)
    }
    return mkdirStatus
  }
}

module.exports = new Log()
