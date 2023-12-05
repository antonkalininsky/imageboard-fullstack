const Router = require('express')
const router = new Router()
const threadController = require('../controller/thread.controller')
const validate = require('../validators/validate')
const threadValidator = require('../validators/thread.validators')

router.get(
    '/thread',
    threadController.getThreads
)

router.get(
    '/thread/:id',
    threadValidator.threadIdValidator,
    validate,
    threadController.getOneThread
)

router.post(
    '/thread',
    threadValidator.createValidator,
    validate,
    threadController.createThread
)

router.put(
    '/thread/:id',
    threadValidator.threadIdValidator,
    validate,
    threadController.updateThread
)

router.delete(
    '/thread/:id',
    threadValidator.threadIdValidator,
    validate,
    threadController.deleteThread
)

router.post(
    '/update-thread/:id',
    threadValidator.threadIdValidator,
    validate,
    threadController.updateThreadCounts
)

router.post(
    '/hide-thread/:id',
    threadValidator.threadIdValidator,
    validate,
    threadController.hideThread
)

module.exports = router