import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ThreadBlock from '../components/ThreadBlock'
import ThreadForm from '../components/ThreadForm'

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

  const submitPost = async (value) => {
    await axios.post('/threads', {
      text: value
    })
    await fetchData()
  }

  return (
    <div>
      {postList}
      <ThreadForm submit={submitPost} />
    </div>
  );
}
