import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import PostForm from '../components/PostForm'
import { useLocation } from 'react-router-dom'
import MyButton from '../components/UI/MyButton'
import { useNavigate } from 'react-router-dom'
import { mdiArrowLeft } from '@mdi/js'
import useDataSending from '../hooks/useDataSending'
import useDataFetching from '../hooks/useDataFetching'
import ThreadAxiosController from '../controllers/ThreadAxiosController'
import PostAxiosController from '../controllers/PostAxiosController'

export default function Thread() {
  const navigate = useNavigate()

  const [postList, setPostList] = useState([])
  const [currentId, setCurrentId] = useState(null)

  const { data, loading, error, sendData } = useDataSending(PostAxiosController.createPost)
  const { data: threadData, loading: threadLoading, error: threadError, fetchData: threadFetchData } = useDataFetching(ThreadAxiosController.getThreadById)
  const { data: postData, loading: postLoading, error: postError, fetchData: postFetchData } = useDataFetching(PostAxiosController.getPostsByThreadId)
  let location = useLocation()

  useEffect(() => {
    setCurrentId(location.pathname.split('/').at(-1))
    const test = location.pathname.split('/').at(-1)
    threadFetchData(test)
    postFetchData(test)
  }, [])

  const handleRouting = () => {
    navigate(`/`)
  }

  useEffect(() => {
    if (Array.isArray(postData)) {
      setPostList(postData.map(post => <Post text={post.content} key={post.id} />))
    }
  }, [JSON.stringify(postData)])

  const submitPost = async (value) => {
    await sendData({
      content: value,
      threadId: currentId
    })
    await postFetchData(currentId)
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
      {
        !threadLoading &&
        <div className='w-1/2 text-white'>
          <div className='text-2xl font-semibold mb-5'>
            {threadData?.title}
          </div>
          <div className='mb-5 text-lg font-medium'>
            {threadData?.content}
          </div>
        </div>
      }
      {/* <div className='w-1/2 h-1 bg-gray-darker mb-5'></div> */}
      <PostForm submit={submitPost} className='w-1/2 mb-10' />
      <div className='w-1/2'>
        {postList}
      </div>
    </div>
  );
}
