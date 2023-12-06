const db = require('../db')
const moment = require('moment')

class PostController {
    async createPost(payload) {
        const { title, content, sage, threadId } = payload
        // sending
        const titleCheck = title ? title : content.slice(0, 50)
        const sageCheck = sage ? true : false
        const createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
        const newPost =
            await db.query(
                'INSERT INTO post (title, content, sage, thread_id, created_at) values ($1, $2, $3, $4, $5) RETURNING *',
                [titleCheck, content, sageCheck, threadId, createdAt]
            )
        return newPost.rows[0]
    }

    async updatePost(id, payload) {
        const updatableFields = ['title', 'content']
        let counter = 1
        let RequestSQL = ''
        const MapperSQL = []
        updatableFields.forEach((field) => {
            if (postNewpayloadData?.[field]) {
                if (RequestSQL.length !== 0) RequestSQL += ', '
                RequestSQL += `${field} = ($${counter})`
                MapperSQL.push(payload[field])
                counter++
            }
        })
        await db.query(`UPDATE post SET ${RequestSQL} WHERE id = ($${counter})`, [...MapperSQL, id])
    }

    async deletePost(id) {
        await db.query('DELETE FROM post WHERE id = ($1)', [id])
    }

    async getOnePost(id) {
        const post = await db.query('SELECT * FROM post WHERE id = ($1)', [id])
        return post.rows[0]
    }

    async getPosts(id) {
        // todo - исправить эндпоинт, не понятно что тут мы по тредам получаем посты
        let posts
        if (id) {
            posts = await db.query('SELECT * FROM post WHERE thread_id = ($1)', [id])
        } else {
            posts = await db.query('SELECT * FROM post')
        }
        return posts.rows
    }
}

module.exports = new PostController()