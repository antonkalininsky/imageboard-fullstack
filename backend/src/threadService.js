const fs = require('fs')
const threadsFilePath = 'data/threads.json'

module.exports = class ThreadService {
    constructor() {
        this.timeLimit = 24*60*60*1000
    }

    checkThreads() {
        const jsonData = fs.readFileSync(threadsFilePath, 'utf-8')
        const threadsData = JSON.parse(jsonData)
        const currentTime = Date.now()
        const updatedThreadsData = threadsData.filter((thread) => this.timeLimit > currentTime - thread.timeCreation)
        fs.writeFileSync(threadsFilePath, JSON.stringify(updatedThreadsData))
        setTimeout(() => this.checkThreads(), 5000)
    }
}