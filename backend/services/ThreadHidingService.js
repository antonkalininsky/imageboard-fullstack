const threadController = require('../controller/thread.controller')

module.exports = class ThreadHidingService {
    constructor() {
        // minutes
        this.checkCycleLength = 5
        this.lifetimeLength = 24 * 60
    }

    // todo - остановка
    run() {
        console.log('threadHidingService is running');
        this.checkThreads()
        setInterval(() => {
            this.checkThreads()
        }, this.checkCycleLength * 1000 * 60)
    }

    async checkThreads() {
        const dateTimeNow = Date.now()
        const threads = await threadController.getThreads()
        for (let i = 0; i < threads.length; i++) {
            const threadCreatedTime = new Date(threads[i].created_at)
            if (dateTimeNow - threadCreatedTime.getTime() > this.lifetimeLength * 60 * 1000) {
                await threadController.hideThread(threads[i].id)
            }
        }
    }
}