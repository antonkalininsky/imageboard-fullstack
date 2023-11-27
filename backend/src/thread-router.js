const Router = require('../framework/router')
const controller = require('./thread-controller')
const router = new Router()

router.get('/threads', controller.getThreads)
router.post('/threads', controller.addThread)
router.delete('/threads', controller.deleteThreads)

module.exports = router