import React from 'react'
import { useState, useEffect } from 'react'
import Post from '../components/Post'
import PostForm from '../components/PostForm'
import { useLocation } from 'react-router-dom'
import MyButton from '../components/UI/MyButton'
import { useNavigate } from 'react-router-dom'
import { mdiArrowLeft } from '@mdi/js'
import useDataFetching from '../hooks/useDataFetching'
import ThreadAxiosController from '../controllers/ThreadAxiosController'
import PostAxiosController from '../controllers/PostAxiosController'
import moment from 'moment'
import FavThreadButton from '../components/FavThreadButton'
import Loader from '../components/UI/Loader'
import ErrorMsg from '../components/UI/ErrorMsg'

export default function Thread() {
    const navigate = useNavigate()

    const [postList, setPostList] = useState([])
    const [currentId, setCurrentId] = useState(null)

    const { data: threadData, loading: threadLoading, error: threadError, fetchData: threadFetchData } = useDataFetching(ThreadAxiosController.getThreadById)
    const { data: postData, loading: postsLoading, error: postsError, fetchData: postFetchData } = useDataFetching(PostAxiosController.getPostsByThreadId)
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

    useEffect(() => {
        if (Array.isArray(postData)) {
            setPostList(postData.map(post => <Post {...post} key={post.id} />))
        }
    }, [JSON.stringify(postData)])

    return (
        <>
            <div className='flex flex-col justify-start items-center pt-10'>
                {(postsError || threadError) && <ErrorMsg />}
            </div>
            {!postsError && !threadError &&
                <div className='flex flex-col justify-start items-center'>
                    {
                        threadLoading
                            ? <Loader />
                            :
                            <div className='w-1/2'>
                                <div className='mb-10 flex'>
                                    <MyButton
                                        text={'Back'}
                                        onClick={() => navigate(`/`)}
                                        className='self-start mr-2'
                                        icon={mdiArrowLeft}
                                    />
                                    <FavThreadButton id={+currentId} />
                                </div>
                                <div className='text-white'>
                                    <div className='mb-5 flex justify-between'>
                                        <div className='text-2xl font-semibold'>
                                            {threadData?.title}
                                        </div>
                                        <div>
                                            {moment(threadData?.createdAt).format('HH:mm:ss DD.MM.YYYY')}
                                        </div>
                                    </div>
                                    <div className='mb-5 text-lg font-medium'>
                                        {threadData?.content}
                                    </div>
                                </div>
                                <PostForm threadId={currentId} updatePosts={() => postFetchData(currentId)} className='my-5' />
                            </div>
                    }
                    <div className='text-white font-bold bg-gray-darker rounded-lg p-4 mb-5'>
                        Responses: <span className='text-pink'>{postData?.length}</span>
                    </div>
                    <div className='w-1/2 flex flex-col justify-start items-center'>
                        {
                            postsLoading
                                ? <Loader />
                                : postList
                        }
                    </div>
                </div>
            }
        </>
    );
}
