require('dotenv').config()

const express = require('express')
const postRouter = require('./routes/post.routes')
const threadRouter = require('./routes/thread.routes')
const ThreadHidingService = require('./services/ThreadHidingService')

const threadHidingService = new ThreadHidingService()

const app = express()
const port = 5000

app.use(express.json())
app.use('/api', postRouter)
app.use('/api', threadRouter)


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

threadHidingService.run()