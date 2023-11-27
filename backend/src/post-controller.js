const BUMP_LIMIT = 100

const fs = require('fs')
const postsFilePath = 'data/posts.json'
const threadsFilePath = 'data/threads.json'

const getPosts = (req, res) => {
    const jsonData = fs.readFileSync(postsFilePath, 'utf-8')
    const postsData = JSON.parse(jsonData)
    if (req.params.id) {
        const searchedPost = postsData.find((post) => post.id == req.params.id)
        if (searchedPost) {
            res.send(searchedPost)
        } else {
            res.send('post not found!')
        }
    } else if (req.params.threadId) {
        const postsFromThread = postsData.filter(post => post.threadId == req.params.threadId)
        res.send(postsFromThread)
    } else {
        res.send(postsData)
    }
}

const addPost = (req, res) => {
    const jsonData = fs.readFileSync(postsFilePath, 'utf-8')
    const postsData = JSON.parse(jsonData)
    const newPost = req.body
    // required field
    if (!newPost.threadId) {
        res.send('error! threadId is required!')
        return    
    }
    // check for existing thread
    const threadsJsonData = fs.readFileSync(threadsFilePath, 'utf-8')
    const threadsData = JSON.parse(threadsJsonData)
    const targetThread = threadsData.find(thread => thread.id == newPost.threadId)
    if (!targetThread) {
        res.send('error! thread with send id does not exist')
        return    
    }
    // adding post
    newPost.id = postsData.length + 1
    postsData.push(newPost)
    fs.writeFileSync(postsFilePath, JSON.stringify(postsData))
    // updating target thread
    targetThread.postCount += 1
    if (targetThread.postCount <= BUMP_LIMIT && !Boolean(newPost.isSage)) {
        targetThread.timeValue = Date.now()
    }
    fs.writeFileSync(threadsFilePath, JSON.stringify(threadsData))
    res.send('post successfully added')
}

module.exports = {
    getPosts,
    addPost
}