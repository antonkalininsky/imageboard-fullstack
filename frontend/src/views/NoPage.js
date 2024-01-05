import React from 'react'
import MyButton from '../components/UI/MyButton'
import { useNavigate } from 'react-router-dom'

export default function NoPage() {
    const navigate = useNavigate()
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='text-white font-bold bg-gray-darker rounded-lg p-8 my-5 text-2xl'>
                <span className='text-pink'>404</span> page not found
            </div>
            <MyButton
                onClick={() => navigate(`/`)}
                text={'Go to Threads'}
            />
        </div>
    )
}
