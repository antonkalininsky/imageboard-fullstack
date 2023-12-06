const Router = require('express')
const router = new Router()
const threadController = require('../controller/thread.controller')
const validate = require('../validators/validate')
const threadValidator = require('../validators/thread.validators')

router.get(
    '/thread',
    async (req, res) => {
        const result = await threadController.getThreads()
        res.json(result)
    }
)

router.get(
    '/thread/:id',
    threadValidator.threadIdValidator,
    validate,
    async (req, res) => {
        const result = await threadController.getOneThread(req.params.id)
        res.json(result)
    }
)

router.post(
    '/thread',
    threadValidator.createValidator,
    validate,
    async (req, res) => {
        const result = await threadController.createThread(req.body)
        res.json(result)
    }
)

router.put(
    '/thread/:id',
    threadValidator.threadIdValidator,
    validate,
    async (req, res) => {
        await threadController.updateThread(req.params.id, req.body)
        // todo - нужна ли проверка на ошибку?
        res.json('thread successfully updated')
    }
)

router.delete(
    '/thread/:id',
    threadValidator.threadIdValidator,
    validate,
    async (req, res) => {
        await threadController.deleteThread(req.params.id)
        // todo - нужна ли проверка на ошибку?
        res.json('thread successfully deleted')
    }
)

router.post(
    '/hide-thread/:id',
    threadValidator.threadIdValidator,
    validate,
    async (req, res) => {
        await threadController.hideThread(req.params.id)
        // todo - нужна ли проверка на ошибку?
        res.json('thread successfully hidden')
    }
)

module.exports = router