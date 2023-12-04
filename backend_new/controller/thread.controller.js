const db = require('../db')
const moment = require('moment')

class ThreadController {
    async getThreads(req, res) {
        // todo - сортировка по updated_at и без visible
        const result = await db.query('SELECT * FROM thread')
        res.json(result.rows)
    }

    async getOneThread(req, res) {
        const id = req.params.id
        const result = await db.query('SELECT * FROM thread WHERE id = ($1)', [id])
        // todo - dry
        if (result.rowCount == 0) {
            res.status(500).json({
                error: {
                    message: 'Error! Thread with this ID does not exist!'
                }
            })
        } else {
            res.json(result.rows[0])
        }
    }

    async createThread(req, res) {
        const { title, content } = req.body
        // todo - пишется странное время, чей часовой пояс?
        const createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
        const newThread =
            await db.query(
                'INSERT INTO thread (title, content, created_at, updated_at, post_count, visible) values ($1, $2, $3, $4, $5, $6) RETURNING *',
                [title, content, createdAt, createdAt, 0, true]
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
        const result = await db.query(`UPDATE thread SET ${RequestSQL} WHERE id = ($${counter})`, [...MapperSQL, id])
        if (result.rowCount == 0) {
            res.status(500).json({
                error: {
                    message: 'Error! Thread with this ID does not exist!'
                }
            })
        } else {
            res.json('Thread successfully updated!')
        }
    }

    async deleteThread(req, res) {
        const id = req.params.id
        const result = await db.query('DELETE FROM thread WHERE id = ($1)', [id])
        if (result.rowCount == 0) {
            res.status(500).json({
                error: {
                    message: 'Error! Thread with this ID does not exist!'
                }
            })
        } else {
            res.json('Thread successfully deleted!')
        }
    }

    async updateThreadCounts(req, res) {
        const id = req.params.id
        const result = await db.query('SELECT * FROM thread WHERE id = ($1)', [id])
        if (result.rowCount == 0) {
            res.status(500).json({
                error: {
                    message: 'Error! Thread with this ID does not exist!'
                }
            })
        }
        console.log(result.rows[0]);
        const postCount = result.rows[0].post_count + 1
        const updatedAt = moment().format('YYYY-MM-DD hh:mm:ss')
        const resultUpdate = await db.query(`UPDATE thread SET post_count = ($1), updated_at = ($2) WHERE id = ($3)`, [postCount, updatedAt, id])
        if (resultUpdate.rowCount == 0) {
            res.status(500).json({
                error: {
                    message: 'Error! Thread with this ID does not exist!'
                }
            })
        } else {
            res.json('Thread successfully updated!')
        }


    }

    async hideThread(req, res) {
        const id = req.params.id
        const result = await db.query(`UPDATE thread SET visible = ($1) WHERE id = ($2)`, [false, id])
        if (result.rowCount == 0) {
            res.status(500).json({
                error: {
                    message: 'Error! Thread with this ID does not exist!'
                }
            })
        } else {
            res.json('Thread successfully hidden!')
        }
    }
}

module.exports = new ThreadController()