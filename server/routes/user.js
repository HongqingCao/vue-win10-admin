const router = require('koa-router')()
const User = require('../controllers/user')

router.prefix('/api/user')
router.post('/login', User.login)
router.post('/registered', User.registered)
module.exports = router