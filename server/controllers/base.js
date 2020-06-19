const UserModel = require('../model/user')
const utils = require('../utils/utils')
const JWT = require('jsonwebtoken')
const Path = require('path')
const Fs = require('fs')
const NodeLog = require('../log/index')

// 秘钥
const secret = 'VISITOR'

class Base{
  constructor () {
    this.utils = utils
  }

  // 获取到用户信息
  async getUserInfo (req) {
    let userInfo = {}, result
    JWT.verify(req.headers.authorization, secret, (error, decoded) => {
      if (error) {
        return {}
      }
      userInfo = decoded
    })
    // 直接从数据库获取，能保证用户最新的数据
    result = await UserModel.findOne({id: userInfo.id, flag: 1})
    return result
  }

  // 通过账号获取到用户信息
  async getUserByAccount(where){
    const result = await UserModel.findOne({where})
    return result
  }
  
  // 获取客户端IP
  getClientIp (req) {
    let ip = req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || ''

    console.log("ip:" + ip)
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    return ip
  }

  // 获取服务端地址
  getServiceAddr (req) {
    const headers = req.headers
    return req.protocol + '://' + headers.host
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
  // TODO: 异常处理, 有时间扩展, 从这里转发到异常处理模块处理
  handleException (ctx, e) {
    // 写入日志
    NodeLog.writeLog(`\n异常发生时间${new Date()}: \n${e}`)
    
    ctx.body = {
      code: e.errno || 20501,
      success: false,
      content: e,
      message: '服务器内部错误'
    }
  }
}

module.exports =  Base
