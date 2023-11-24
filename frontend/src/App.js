import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './components/Post'
import PostForm from './components/PostForm'

function App() {

  const [posts, setPosts] = useState([])
  const [postList, setPostList] = useState([])

  const fetchData = async () => {
    const res = await axios.get('/posts')
    setPosts(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setPostList(posts.map(post => <Post text={post.text} key={post.id} />))
  }, [JSON.stringify(posts)])

  const submitPost = async (value) => {
    await axios.post('/posts', {
      text: value
    })
    await fetchData()
  }

  return (
    <div>
      {postList}
      <PostForm submit={submitPost} />
    </div>
  );
}

export default App;
