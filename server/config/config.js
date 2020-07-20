/*
 * @Author: codercao 
 * @Date: 2020-04-02 16:49:36 
 * @Last Modified by: codercao
 * @Last Modified time: 2020-07-20 16:42:48
 */

const config = {
  // 启动端口
  port: 2020,
  //秘钥
  secret:'win10',
  // 数据库配置
  database: {
    dbName: 'db_win',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456@cao',
    timezone: '+08:00'
  }
}

module.exports = config