const threadController = require('../controller/thread.controller')

module.exports = class ThreadHidinService {
    constructor() {
        // minutes
        this.checkCycleLength = 5
        this.lifetimeLength = 24 * 60
    }

    // todo - доделать
    check() {
        setTimeout(async () => {
            const dateTimeNow = Date.now()
            const threads = await threadController.getThreads()
            for (const i = 0; i < threads.length; i++) {
                const threadCreatedTime = new Date(threads[i].created_at)
                if (dateTimeNow - threadCreatedTime.getTime() > lifetimeLength*60*1000) {
                    await threadController.hideThread(threads[i].id)
                }
            }
        }, checkCycleLength * 1000 * 60)
    }
}