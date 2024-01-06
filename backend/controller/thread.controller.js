const db = require('../db')
const moment = require('moment')

// todo - убрать зависимости от res
class ThreadController {
    async getThreads() {
        const result = await db.query('SELECT * FROM thread WHERE visible = true ORDER BY updated_at DESC')
        return result.rows.map((thread) => {
            return {
                id: thread.id,
                title: thread.title,
                content: thread.content,
                createdAt: thread.created_at,
                updatedAt: thread.updated_at,
                postCount: thread.post_count
            }
        })
    }

    async getOneThread(id) {
        const result = await db.query('SELECT * FROM thread WHERE id = ($1)', [id])
        return {
            id: result.rows[0].id,
            title: result.rows[0].title,
            content: result.rows[0].content,
            createdAt: result.rows[0].created_at,
            updatedAt: result.rows[0].updated_at,
            postCount: result.rows[0].post_count
        }
    }

    async createThread(payload) {
        const { title, content, userId } = payload
        // todo - пишется странное время, чей часовой пояс?
        const titleCheck = title ? title : content.slice(0, 50)
        const createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
        const newThread =
            await db.query(
                'INSERT INTO thread (title, content, created_at, updated_at, post_count, visible, user_id) values ($1, $2, $3, $4, 0, true, $5) RETURNING *',
                [titleCheck, content, createdAt, createdAt, userId]
            )
        return {
            id: newThread.rows[0].id,
            title: newThread.rows[0].title,
            content: newThread.rows[0].content,
            createdAt: newThread.rows[0].created_at,
            updatedAt: newThread.rows[0].updated_at,
            postCount: newThread.rows[0].post_count
        }
    }

    async updateThread(id, payload) {
        const updatableFields = ['title', 'content', 'visible']
        const postNewData = payload
        let counter = 1
        let RequestSQL = ''
        const MapperSQL = []
        updatableFields.forEach((field) => {
            if (postNewData?.[field]) {
                if (RequestSQL.length !== 0) RequestSQL += ', '
                RequestSQL += `${field} = ($${counter})`
                MapperSQL.push(postNewData[field])
                counter++
            }
        })
        await db.query(`UPDATE thread SET ${RequestSQL} WHERE id = ($${counter})`, [...MapperSQL, id])
        // todo - нужна ли проверка на ошибку?
    }

    async deleteThread(id) {
        await db.query('DELETE FROM thread WHERE id = ($1)', [id])
        // todo - нужна ли проверка на ошибку?
    }

    async deletaAllThreads() {
        await db.query('DELETE FROM thread')
    }

    async hideThread(id) {
        await db.query(`UPDATE thread SET visible = ($1) WHERE id = ($2)`, [false, id])
        // todo - нужна ли проверка на ошибку?
    }


    async updateThreadCounts(id, saged = false) {
        const result = await db.query('SELECT COUNT(*) FROM post WHERE thread_id = ($1)', [id])
        const postCount = result.rows[0].count
        if (saged) {
            await db.query(`UPDATE thread SET post_count = ($1) WHERE id = ($2)`, [postCount, id])
        } else {
            const updatedAt = moment().format('YYYY-MM-DD hh:mm:ss')
            await db.query(`UPDATE thread SET post_count = ($1), updated_at = ($2) WHERE id = ($3)`, [postCount, updatedAt, id])
        }
    }

    async getSelectedThreads(ids) {
        const stringOfIds = ids.join(', ')
        const result = await db.query(`SELECT id, title, post_count FROM thread WHERE visible = true AND id IN (${stringOfIds}) ORDER BY updated_at DESC`)
        return result.rows.map((thread) => {
            return {
                id: thread.id,
                title: thread.title,
                postCount: thread.post_count
            }
        })
    }

    async checkOriginalPoster(threadId, userId) {
        const result = await db.query('SELECT * FROM thread WHERE id = ($1) AND user_id = ($2)', [threadId, userId])
        return result.rows.length !== 0
    }
}

module.exports = new ThreadController()