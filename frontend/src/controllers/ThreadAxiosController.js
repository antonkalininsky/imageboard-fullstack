import axios from 'axios'

class ThreadAxiosController {

    createThread(payload) {
        return axios.post('/api/thread', payload)
    }

    getThreads() {
        return axios.get('/api/thread')
    }

    getThreadById(id) {
        return axios.get(`/api/thread/${id}`)
    }

    getFavThreadsData(payload) {
        return axios.post('/api/selected-threads', {
            ids: payload
        })
    }

}

export default new ThreadAxiosController()