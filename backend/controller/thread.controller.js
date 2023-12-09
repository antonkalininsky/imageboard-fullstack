const db = require('../db')
const moment = require('moment')

// todo - убрать зависимости от res
class ThreadController {
    async getThreads() {
        const result = await db.query('SELECT * FROM thread WHERE visible = ($1) ORDER BY updated_at DESC', [true])
        return result.rows
    }

    async getOneThread(id) {
        const result = await db.query('SELECT * FROM thread WHERE id = ($1)', [id])
        return result.rows[0]
    }

    async createThread(payload) {
        const { title, content } = payload
        // todo - пишется странное время, чей часовой пояс?
        const titleCheck = title ? title : content.slice(0, 50)
        const createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
        const newThread =
            await db.query(
                'INSERT INTO thread (title, content, created_at, updated_at, post_count, visible) values ($1, $2, $3, $4, $5, $6) RETURNING *',
                [titleCheck, content, createdAt, createdAt, 0, true]
            )
        return newThread.rows[0]
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
}

module.exports = new ThreadController()