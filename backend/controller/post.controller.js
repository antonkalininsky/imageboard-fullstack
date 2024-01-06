const db = require('../db')
const moment = require('moment')

class PostController {
    async createPost(payload, isOpCheck) {
        const { title, content, sage, threadId, userId, isOp } = payload
        // sending
        const titleCheck = title ? title : 'Anon'
        const sageCheck = sage ? true : false
        const createdAt = moment().format('YYYY-MM-DD hh:mm:ss')
        const isOpResult = isOpCheck && isOp
        const newPost =
            await db.query(
                'INSERT INTO post (title, content, sage, thread_id, created_at, user_id, original_poster) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [titleCheck, content, sageCheck, threadId, createdAt, userId, isOpResult]
            )
        return {
            id: newPost.rows[0].id,
            content: newPost.rows[0].content,
            createdAt: newPost.rows[0].created_at,
            sage: newPost.rows[0].sage,
            isOp: newPost.rows[0].original_poster,
            threadId: newPost.rows[0].thread_id,
            title: newPost.rows[0].title
        }
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

    async deleteAllPosts() {
        await db.query('DELETE FROM post')
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
        return posts.rows.map((post) => {
            return {
                id: post.id,
                content: post.content,
                createdAt: post.created_at,
                sage: post.sage,
                isOp: post.original_poster,
                threadId: post.thread_id,
                title: post.title
            }
        })
    }
}

module.exports = new PostController()