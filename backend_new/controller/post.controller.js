const db = require('../db')
const moment = require('moment')

class PostController {
    async createPost(req, res) {
        // todo - update thread
        const { title, content, sage, threadId } = req.body
        // sending
        const titleCheck = title ? title : content.slice(0, 50)
        const sageCheck = sage ? true : false
        const createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
        const newPost =
            await db.query(
                'INSERT INTO post (title, content, sage, thread_id, created_at) values ($1, $2, $3, $4, $5) RETURNING *',
                [titleCheck, content, sageCheck, threadId, createdAt]
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
        await db.query(`UPDATE post SET ${RequestSQL} WHERE id = ($${counter})`, [...MapperSQL, id])
        res.json('post successfully updated')
    }

    async deletePost(req, res) {
        // todo - update thread
        const id = req.params.id
        await db.query('DELETE FROM post WHERE id = ($1)', [id])
        res.json('post successfully deleted')
    }

    async getOnePost(req, res) {
        const id = req.params.id
        const post = await db.query('SELECT * FROM post WHERE id = ($1)', [id])
        res.json(post.rows[0])
    }

    async getPosts(req, res) {
        let posts
        if (req.query?.threadId) {
            posts = await db.query('SELECT * FROM post WHERE thread_id = ($1)', [req.query.threadId])
        } else {
            posts = await db.query('SELECT * FROM post')
        }
        res.json(posts.rows)
    }
}

module.exports = new PostController()