const Router = require('express')
const router = new Router()
const postController = require('../controller/post.controller')

router.get('/post', postController.getPosts)
router.get('/post/:id', postController.getOnePost)
router.post('/post', postController.createPost)
router.put('/post/:id', postController.updatePost)
router.delete('/post/:id', postController.deletePost)

module.exports = router