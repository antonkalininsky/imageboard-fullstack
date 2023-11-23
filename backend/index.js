
const PORT = process.env.PORT || 5000
const Application = require('./framework/application')
const postRouter = require('./src/post-router')
const parseUrl = require('./framework/middlewares/parseUrl')
const parseJson = require('./framework/middlewares/parseJson')

const app = new Application()

app.use(parseJson)
app.use(parseUrl('http://localhost:5000'))

app.addRouter(postRouter)

try {
    app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
} catch(error) {
    console.log(error)
}