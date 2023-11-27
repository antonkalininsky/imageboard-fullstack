import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ThreadBlock from '../components/ThreadBlock'
// import PostForm from '../components/PostForm'

export default function Threads() {

  const [posts, setPosts] = useState([])
  const [postList, setPostList] = useState([])

  const fetchData = async () => {
    const res = await axios.get('/threads')
    setPosts(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setPostList(posts.map(post => <ThreadBlock {...post} key={post.id} />))
  }, [JSON.stringify(posts)])

  // const submitPost = async (value) => {
  //   await axios.post('/posts', {
  //     text: value
  //   })
  //   await fetchData()
  // }

  return (
    <div>
      {postList}
      {/* <PostForm submit={submitPost} /> */}
    </div>
  );
}
