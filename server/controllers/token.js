/*
 * @Author: your name
 * @Date: 2020-07-04 15:12:58
 * @LastEditTime: 2020-07-12 22:36:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-win10-admin\server\controllers\token.js
 */ 
const TokenModel = require('../model/token')
const Op = require('sequelize').Op
const JWT = require('jsonwebtoken')
const { secret } = require('../config/config')

class Token {
  constructor () {
    this.setToken = this.setToken.bind(this)
    this.getToken = this.getToken.bind(this)
  }
  async setToken (data, obj) {
    let search, sql, newUserInfo = JSON.parse(JSON.stringify(data)), oldUserInfo = {}
    try {
      search = await this.getToken({user_id: data.user_id})
    } catch (e) {
      throw e
    }

    // 用户不存在则创建一条数据，存在则将原来的token替换掉
    if (!search) {
      sql = await TokenModel.create(obj.set)
    } else {
      // 解析token和当前数据做对比
      JWT.verify(search[data.type + '_token'], secret, (error, decoded) => {
        if (error) {
          return {}
        }
        oldUserInfo = decoded
      })
     
      // 用户数据发生变化，重新设置数据信息，只修改token
      delete newUserInfo[data.type + '_expire_time']
      delete oldUserInfo[data.type + '_expire_time']
      delete oldUserInfo.iat
      if (JSON.stringify(newUserInfo) !== JSON.stringify(oldUserInfo)) {
        obj.set = {
          [data.type + '_token']: obj.set[data.type + '_token']
        }
        sql = await  TokenModel.update(obj.set, {where:{user_id: data.user_id}})

      } else if(+new Date(search[data.type + '_expire_time']) > +new Date()) {
        // 数据未过期，不处理
        sql = ``
      } 
      else {
        sql = await TokenModel.update(obj.set, {where:{user_id: data.user_id}})
      }
    }
    return sql
  }

  async getToken (where) {

    const result = await TokenModel.findOne({where:where})
    return result
  }
}
module.exports =  new Token()
