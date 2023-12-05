const Router = require('express')
const router = new Router()
const postController = require('../controller/post.controller')
const postValidator = require('../validators/post.validators')
const validate = require('../validators/validate')

router.get(
    '/post',
    postController.getPosts
)

router.get('/post/:id',
    postValidator.postIdValidator,
    validate,
    postController.getOnePost
)

router.post(
    '/post',
    postValidator.createValidator,
    validate,
    postController.createPost
)

router.put(
    '/post/:id', 
    postValidator.postIdValidator,
    validate,
    postController.updatePost
)

router.delete('/post/:id',
    postValidator.postIdValidator,
    validate,
    postController.deletePost
)

module.exports = router