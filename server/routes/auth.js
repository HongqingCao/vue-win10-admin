const router = require('koa-router')()
const Auth = require('../controllers/auth.js')

router.prefix('/api/auth')

router.get('/getList', Auth.getList)
router.get('/getAll', Auth.getAll)
router.post('/created', Auth.created)
router.post('/update', Auth.update)
router.post('/delete', Auth.delete)

module.exports = router