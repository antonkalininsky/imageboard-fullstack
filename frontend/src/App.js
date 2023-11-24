import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from './components/Post'

function App() {

  const [posts, setPosts] = useState([])
  const [postList, setPostList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/posts')
      setPosts(res.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    posts.forEach(post => {
      setPostList(posts.map(post => <Post text={post.text} key={post.id} />))
    })
  }, [JSON.stringify(posts)])

  return (
    <div>
      {postList}
    </div>
  );
}

export default App;
