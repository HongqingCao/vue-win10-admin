const router = require('koa-router')()
const Auth = require('../controllers/auth.js')

router.prefix('/api/auth')
/**
 * 注册
 * @api {POST} /api/user/registered 注册
 * @apiDescription 注册用户
 * @apiName registered
 * @apiParam (参数) {String} account 账号
 * @apiParam (参数) {String} password 密码
 * @apiParam (参数) {Number} type 用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
 * @apiSampleRequest /api/user/registered
 * @apiGroup User
 * @apiVersion 0.0.1
 */

router.get('/getList', Auth.getList)
module.exports = router