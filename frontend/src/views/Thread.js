import React from 'react'
import { useState, useEffect } from 'react'
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
import moment from 'moment'
import FavThreadButton from '../components/FavThreadButton'
import UserIdentificator from '../services/UserIdentificator'

export default function Thread() {
    const navigate = useNavigate()

    const [postList, setPostList] = useState([])
    const [currentId, setCurrentId] = useState(null)

    const { sendData: createPost } = useDataSending(PostAxiosController.createPost)
    const { data: threadData, loading: threadLoading, fetchData: threadFetchData } = useDataFetching(ThreadAxiosController.getThreadById)
    const { data: postData, fetchData: postFetchData } = useDataFetching(PostAxiosController.getPostsByThreadId)
    let location = useLocation()

    useEffect(() => {
        setCurrentId(location.pathname.split('/').at(-1))
    }, [location.pathname])

    useEffect(() => {
        if (currentId !== null) {
            threadFetchData(currentId)
            postFetchData(currentId)
        }
    }, [currentId])

    const handleRouting = () => {
        navigate(`/`)
    }

    useEffect(() => {
        if (Array.isArray(postData)) {
            setPostList(postData.map(post => <Post {...post} key={post.id} />))
        }
    }, [JSON.stringify(postData)])

    const submitPost = async (value) => {
        await createPost({
            ...value,
            threadId: currentId,
            userId: UserIdentificator.getUserId()
        })
        await postFetchData(currentId)
    }

    return (
        <div className='flex flex-col justify-start items-center pt-10'>
            <div className='w-1/2 mb-10 flex'>
                <MyButton
                    text={'Back'}
                    onClick={handleRouting}
                    className='self-start mr-2'
                    icon={mdiArrowLeft}
                />
                <FavThreadButton id={+currentId} />
            </div>
            {
                !threadLoading &&
                <div className='w-1/2 text-white'>
                    <div className='mb-5 flex justify-between'>
                        <div className='text-2xl font-semibold'>
                            {threadData?.title}
                        </div>
                        <div>
                            {moment(threadData?.created_at).format('hh:mm:ss DD.MM.YYYY')}
                        </div>
                    </div>
                    <div className='mb-5 text-lg font-medium'>
                        {threadData?.content}
                    </div>
                </div>
            }
            {/* <div className='w-1/2 h-1 bg-gray-darker mb-5'></div> */}
            <PostForm submit={submitPost} className='w-1/2 mb-5' />
            <div className='text-white font-bold bg-gray-darker rounded-lg p-4 mb-5'>
                Responses: <span className='text-pink'>{postData?.length}</span>
            </div>
            <div className='w-1/2'>
                {postList}
            </div>
        </div>
    );
}
