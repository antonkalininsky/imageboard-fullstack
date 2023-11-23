const Router = require('../framework/router')
const controller = require('./post-controller')
const router = new Router()

router.get('/posts', controller.getPosts)

module.exports = router