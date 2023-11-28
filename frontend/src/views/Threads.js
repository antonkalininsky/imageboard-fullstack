import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ThreadBlock from '../components/ThreadBlock'
import ThreadForm from '../components/ThreadForm'
import ThreadContainer from '../components/UI/ThreadContainer'

export default function Threads() {

  const [posts, setPosts] = useState([])
  const [postList, setPostList] = useState([])

  const fetchData = async () => {
    const res = await axios.get('/threads')
    setPosts(res.data)
  }

  useEffect(() => {
    // fetchData()
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
    <div className='bg-gray-dark flex flex-col justify-start items-center pt-10'>
      {/* {postList}
      <ThreadForm submit={submitPost} /> */}
      <ThreadContainer />
      <ThreadContainer />
      <ThreadContainer />
    </div>
  );
}
