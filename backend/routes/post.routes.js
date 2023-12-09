const Router = require('express')
const router = new Router()
const postController = require('../controller/post.controller')
const threadController = require('../controller/thread.controller')
const postValidator = require('../validators/post.validators')
const validate = require('../validators/validate')

router.get(
    '/post',
    async (req, res) => {
        const result = await postController.getPosts(req.query?.threadId)
        res.json(result)
    }
)

router.get('/post/:id',
    postValidator.postIdValidator,
    validate,
    async (req, res) => {
        const result = await postController.getOnePost(req.params.id)
        res.json(result)
    }
)

router.post(
    '/post',
    postValidator.createValidator,
    validate,
    async (req, res) => {
        const result = await postController.createPost(req.body)
        await threadController.updateThreadCounts(req.body.threadId, req.body.sage)
        res.json(result)
    }
)

router.put(
    '/post/:id', 
    postValidator.postIdValidator,
    validate,
    async (req, res) => {
        await postController.updatePost(req.params.id, req.body)
        res.json('post successfully updated')
    }
)

router.delete('/post/:id',
    postValidator.postIdValidator,
    validate,
    async (req, res) => {
        const result = await postController.getOnePost(req.params.id)
        await postController.deletePost(req.params.id)
        await threadController.updateThreadCounts(result.thread_id)
        res.json('post successfully deleted')
    }
)

module.exports = router