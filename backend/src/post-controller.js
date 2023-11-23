const fs = require('fs')
const filePath = 'data/posts.json'

const getPosts = (req, res) => {
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    if (req.params.id) {
        const postsData = JSON.parse(jsonData)
        const searchedPost = postsData.find((post) => post.id == req.params.id)
        if (searchedPost) {
            res.send(searchedPost)
        } else {
            res.send('post not found!')
        }
    } else {
        res.send(JSON.parse(jsonData))
    }
}

const addPost = (req, res) => {
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const postsData = JSON.parse(jsonData)
    const newPost = req.body
    newPost.id = postsData.length + 1
    postsData.push(newPost)
    fs.writeFileSync(filePath, JSON.stringify(postsData))
    res.send('post successfully added')
}

module.exports = {
    getPosts,
    addPost
}