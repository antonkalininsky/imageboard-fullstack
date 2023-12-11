import React, { useState, useEffect } from 'react'
import ThreadForm from '../components/ThreadForm'
import ThreadContainer from '../components/ThreadContainer'
import useDataFetching from '../hooks/useDataFetching'
import ThreadAxiosController from '../controllers/ThreadAxiosController'
import Loader from '../components/UI/Loader'

export default function Threads() {
  const { data, loading, error, fetchData } = useDataFetching(ThreadAxiosController.getThreads)
  const [postList, setPostList] = useState([])

  useEffect(() => fetchData, [])

  useEffect(() => {
    if (Array.isArray(data)) {
      setPostList(data.map(post => <ThreadContainer {...post} key={post.id} />))
    }
  }, [JSON.stringify(data)])

  return (
    <div className='flex flex-col justify-start items-center pt-10'>
      <ThreadForm triggerUpdate={fetchData} />
      {loading && <Loader/>}
      {error && error}
      {data && postList}
    </div>
  );
}
