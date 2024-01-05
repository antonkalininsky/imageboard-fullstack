import React, { useState, useEffect } from 'react'
import ThreadForm from '../components/ThreadForm'
import ThreadContainer from '../components/ThreadContainer'
import useDataFetching from '../hooks/useDataFetching'
import ThreadAxiosController from '../controllers/ThreadAxiosController'
import Loader from '../components/UI/Loader'
import FavBox from '../components/FavBox/FavBox'

export default function Threads() {
  const { data, loading, error, fetchData } = useDataFetching(ThreadAxiosController.getThreads)
  const [postList, setPostList] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (Array.isArray(data)) {
      setPostList(data.map(post => <ThreadContainer {...post} key={post.id} />))
    }
  }, [JSON.stringify(data)])

  return (
    <div className='flex flex-col justify-start items-center pt-10'>
      <FavBox />
      <ThreadForm triggerUpdate={fetchData} />
      <div className='text-white font-bold bg-gray-darker rounded-lg p-4 my-5'>
        Threads: <span className='text-pink'>{postList?.length}</span>
      </div>
      {loading && <Loader />}
      {error && error}
      {data && postList}
    </div>
  );
}
