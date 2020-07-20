const router = require('koa-router')()
const User = require('../controllers/user')

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