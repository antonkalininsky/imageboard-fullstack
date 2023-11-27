import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import PostForm from '../components/PostForm'
import { useLocation, Link } from 'react-router-dom'



export default function Thread() {

    const [posts, setPosts] = useState([])
    const [postList, setPostList] = useState([])
    let location = useLocation()
  
    const fetchData = async () => {
      const currentId = location.pathname.split('/').at(-1)
      const res = await axios.get(`/posts?threadId=${currentId}`)
      setPosts(res.data)
    }
  
    useEffect(() => {
      fetchData()
    }, [])
  
    useEffect(() => {
      setPostList(posts.map(post => <Post text={post.text} key={post.id} />))
    }, [JSON.stringify(posts)])
  
    const submitPost = async (value) => {
      const currentId = location.pathname.split('/').at(-1)
      await axios.post('/posts', {
        text: value,
        threadId: currentId
      })
      await fetchData()
    }
  
    return (
      <div>
        <Link to={`/`}>назад</Link>
        {postList}
        <PostForm submit={submitPost} />
      </div>
    );
}
