const fs = require('fs')
const filePath = 'data/threads.json'

const getThreads = (req, res) => {
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    if (req.params.id) {
        const threadsData = JSON.parse(jsonData)
        const searchedThread = threadsData.find((thread) => thread.id == req.params.id)
        if (searchedThread) {
            res.send(searchedThread)
        } else {
            res.send('thread not found!')
        }
    } else {
        res.send(JSON.parse(jsonData))
    }
}

const addThread = (req, res) => {
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const threadsData = JSON.parse(jsonData)
    const newThread = req.body
    newThread.id = threadsData.length + 1
    threadsData.push(newThread)
    fs.writeFileSync(filePath, JSON.stringify(threadsData))
    res.send('thread successfully created')
}

module.exports = {
    getThreads,
    addThread
}