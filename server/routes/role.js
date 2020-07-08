const router = require('koa-router')()
const Role = require('../controllers/role')

router.prefix('/api/role')
router.get('/getAll', Role.getAll)
router.post('/created', Role.created)
router.post('/update', Role.update)
router.post('/delete', Role.delete)
module.exports = router