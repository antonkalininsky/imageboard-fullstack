import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import PostForm from '../components/PostForm'
import { useLocation } from 'react-router-dom'
import MyButton from '../components/UI/MyButton'
import { useNavigate } from 'react-router-dom'
import { mdiArrowLeft } from '@mdi/js'

export default function Thread() {

  const navigate = useNavigate()

  const [originalPost, setOriginalPost] = useState({})
  const [posts, setPosts] = useState([])
  const [postList, setPostList] = useState([])
  let location = useLocation()

  const fetchData = async () => {
    const currentId = location.pathname.split('/').at(-1)
    const resThread = await axios.get(`/threads?id=${currentId}`)
    setOriginalPost(resThread.data)
    const resPost = await axios.get(`/posts?threadId=${currentId}`)
    setPosts(resPost.data)
  }

  const handleRouting = () => {
    navigate(`/`)
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
    <div className='flex flex-col justify-start items-center pt-10'>
      <div className='w-1/2 mb-10'>
        <MyButton
          text={'Back'}
          onClick={handleRouting}
          className='self-start'
          icon={mdiArrowLeft}
        />
      </div>
      <div className='w-1/2 text-white'>
        <div className='text-2xl font-semibold mb-5'>
          {originalPost.header}
        </div>
        <div className='mb-5 text-lg font-medium'>
          {originalPost.text}
        </div>
      </div>
      {/* <div className='w-1/2 h-1 bg-gray-darker mb-5'></div> */}
      <PostForm submit={submitPost} className='w-1/2 mb-10' />
      <div className='w-1/2'>
        {postList}
      </div>
    </div>
  );
}
