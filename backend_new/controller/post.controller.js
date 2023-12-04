const db = require('../db')
const moment = require('moment')

class PostController {
    async createPost(req, res) {
        // todo - update thread
        const { title, content, sage, threadId } = req.body
        const sageCheck = sage ? true : false
        const createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
        const newPost =
            await db.query(
                'INSERT INTO post (title, content, sage, thread_id, created_at) values ($1, $2, $3, $4, $5) RETURNING *',
                [title, content, sageCheck, threadId, createdAt]
            )
        res.json(newPost.rows[0])
    }
    
    async updatePost(req, res) {
        const updatableFields = ['title', 'content']
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
        const result = await db.query(`UPDATE post SET ${RequestSQL} WHERE id = ($${counter})`, [...MapperSQL, id])
        if (result.rowCount == 0) {
            res.status(500).json({
                error: {
                    message: 'Error! Post with this ID does not exist!'
                }
            })
        } else {
            res.json('Post successfully updated!')
        }
    }

    async deletePost(req, res) {
        // todo - update thread
        const id = req.params.id
        const result = await db.query('DELETE FROM post WHERE id = ($1)', [id])
        if (result.rowCount == 0) {
            res.status(500).json({
                error: {
                    message: 'Error! Post with this ID does not exist!'
                }
            })
        } else {
            res.json('Post successfully deleted!')
        }
    }

    async getOnePost(req, res) {
        const id = req.params.id
        const post = await db.query('SELECT * FROM post WHERE id = ($1)', [id])
        if (post.rowCount == 0) {
            res.status(500).json({
                error: {
                    message: 'Error! Post with this ID does not exist!'
                }
            })
        } else {
            res.json(post.rows[0])
        }
    }

    async getPosts(req, res) {
        const posts = await db.query('SELECT * FROM post')
        res.json(posts.rows)
    }
}

module.exports = new PostController()