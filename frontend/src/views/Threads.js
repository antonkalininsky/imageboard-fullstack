import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ThreadBlock from '../components/ThreadBlock'
import ThreadForm from '../components/ThreadForm'
import ThreadContainer from '../components/UI/ThreadContainer'
import PinkButton from '../components/UI/PinkButton'
import MyInput from '../components/UI/MyInput'
import MyTextArea from '../components/UI/MyTextArea'

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
      <MyInput className="w-80 mb-2 mt-5" />
      <MyTextArea className="w-80 mb-2" />
      <PinkButton className="w-80 mb-8">Add Thread</PinkButton>
      <ThreadContainer header={'test1'} text={'test test test'} counter={5} />
      <ThreadContainer header={'test2'} text={'test test test'} counter={0} />
      <ThreadContainer header={'test3'} text={'test test test'} counter={500} />
    </div>
  );
}
