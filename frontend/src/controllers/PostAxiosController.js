import axios from 'axios'

class PostAxiosController {

    createPost(payload) {
        return axios.post('/api/post', payload)
    }

    getPostsByThreadId(threadId) {
        return axios.get('/api/post', {
            params: {
                threadId
            }
        })
    }
}

export default new PostAxiosController()