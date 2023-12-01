import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    fetchData()
  }, [])

  useEffect(() => {
    setPostList(posts.map(post => <ThreadContainer {...post} key={post.id} />))
  }, [JSON.stringify(posts)])

  return (
    <div className='flex flex-col justify-start items-center pt-10'>
      <ThreadForm triggerUpdate={fetchData} />
      {postList}
    </div>
  );
}
