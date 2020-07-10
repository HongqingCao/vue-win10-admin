const router = require('koa-router')()
const Log = require('../controllers/log')

router.prefix('/api/log')
router.get('/getAll', Log.getAll)
router.post('/delete', Log.delete)
module.exports = router