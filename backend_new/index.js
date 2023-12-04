require('dotenv').config()

const express = require('express')
const postRouter = require('./routes/post.routes')

const app = express()
const port = 3000

app.use(express.json())
app.use('/api', postRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})