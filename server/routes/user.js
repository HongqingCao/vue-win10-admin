/*
 * @Author: your name
 * @Date: 2020-07-04 15:12:58
 * @LastEditTime: 2020-07-12 20:50:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \home-worlkf:\github\vue-win10-admin\server\routes\user.js
 */ 
const router = require('koa-router')()
const User = require('../controllers/user')
const ValidateUser  = require('../validate/user')

router.prefix('/api/user')
router.post('/login', User.login)
router.get('/logOut', User.logOut)
router.get('/getInfo', User.getInfo)
router.post('/registered', User.registered)
router.get('/getAll', User.getAll)
router.get('/getList', User.getList)
router.post('/update', User.update)
router.post('/delete', User.delete)
module.exports = router