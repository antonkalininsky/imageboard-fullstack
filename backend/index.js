const PORT = process.env.PORT || 5000

const ThreadService = require('./src/threadService')
const Application = require('./framework/application')
const postRouter = require('./src/post-router')
const threadRouter = require('./src/thread-router')
const parseUrl = require('./framework/middlewares/parseUrl')
const parseJson = require('./framework/middlewares/parseJson')

const app = new Application()
const threadService = new ThreadService()

app.use(parseJson)
app.use(parseUrl('http://localhost:5000'))

app.addRouter(postRouter)
app.addRouter(threadRouter)

try {
    app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
    threadService.checkThreads()
} catch(error) {
    console.log(error)
}