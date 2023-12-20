import React, { useContext } from 'react'
import MyButton from '../UI/MyButton'
import { mdiCancel, mdiChat } from '@mdi/js'
import { useNavigate } from 'react-router-dom'
import FavThreadsContext from '../../context/FavThreadsContext'

export default function FavBoxItem(props) {
    const favThreads = useContext(FavThreadsContext)

    const navigate = useNavigate()

    return (
        <div className='flex align-top justify-between gap-x-2 mt-5'>
            <div className='text-lg text-white font-semibold line-clamp-2'>
                {props.title}
            </div>
            <div className='flex align-top'>
                <MyButton
                    text={'Answers'}
                    icon={mdiChat}
                    onClick={() => navigate(`/thread/${props.id}`)}
                    counter={props.post_count}
                    className="mr-2"
                />
                <MyButton
                    className={'bg-pink hover:bg-pink-mid'}
                    icon={mdiCancel}
                    onClick={() => favThreads.toggleItem(props.id)}
                />
            </div>
        </div>
    )
}
