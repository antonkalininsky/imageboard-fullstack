const Router = require('express')
const router = new Router()
const threadController = require('../controller/thread.controller')

router.get('/thread', threadController.getThreads)
router.get('/thread/:id', threadController.getOneThread)
router.post('/thread', threadController.createThread)
router.put('/thread/:id', threadController.updateThread)
router.delete('/thread/:id', threadController.deleteThread)

router.post('/update-thread/:id', threadController.updateThreadCounts)
router.post('/hide-thread/:id', threadController.hideThread)


module.exports = router