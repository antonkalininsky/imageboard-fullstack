const db = require('../db')
const moment = require('moment')

// todo - убрать зависимости от res
class ThreadController {
    async getThreads(req, res) {
        const result = await db.query('SELECT * FROM thread WHERE visible = ($1) ORDER BY updated_at DESC', [true])
        res.json(result.rows)
    }

    async getOneThread(req, res) {
        const id = req.params.id
        const result = await db.query('SELECT * FROM thread WHERE id = ($1)', [id])
        res.json(result.rows[0])
    }

    async createThread(req, res) {
        const { title, content } = req.body
        // todo - пишется странное время, чей часовой пояс?
        const titleCheck = title ? title : content.slice(0, 50)
        const createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
        const newThread =
            await db.query(
                'INSERT INTO thread (title, content, created_at, updated_at, post_count, visible) values ($1, $2, $3, $4, $5, $6) RETURNING *',
                [titleCheck, content, createdAt, createdAt, 0, true]
            )
        res.json(newThread.rows[0])
    }

    async updateThread(req, res) {
        const updatableFields = ['title', 'content', 'visible']
        const id = req.params.id
        const postNewData = req.body
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
        res.json('thread successfully updated')
    }

    async deleteThread(req, res) {
        const id = req.params.id
        await db.query('DELETE FROM thread WHERE id = ($1)', [id])
        res.json('thread successfully deleted')
    }

    async updateThreadCounts(req, res) {
        const id = req.params.id
        const result = await db.query('SELECT * FROM thread WHERE id = ($1)', [id])
        const postCount = result.rows[0].post_count + 1
        const updatedAt = moment().format('YYYY-MM-DD hh:mm:ss')
        await db.query(`UPDATE thread SET post_count = ($1), updated_at = ($2) WHERE id = ($3)`, [postCount, updatedAt, id])
        res.json('Thread successfully updated!')
    }

    async hideThread(req, res) {
        const id = req.params.id
        await db.query(`UPDATE thread SET visible = ($1) WHERE id = ($2)`, [false, id])
        res.json('thread successfully hidden')
    }
}

module.exports = new ThreadController()