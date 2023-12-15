import React from 'react'
import MyButton from '../UI/MyButton'
import { mdiCancel, mdiChat } from '@mdi/js'
import { useNavigate } from 'react-router-dom'
import useFavThreadHook from '../../hooks/useFavThreadHook'

export default function FavBoxItem(props) {
    const favThreads = useFavThreadHook()

    const navigate = useNavigate()

    const handleDeleteFromFav = () => {
        favThreads.toggleItem(props.id)
    }

    const handleEnterThread = () => {
        navigate(`/thread/${props.id}`)
    }

    return (
        <div className='flex align-top justify-between gap-x-2 mb-5 mt-3'>
            <div className='text-lg text-white font-semibold line-clamp-2'>
                {props.title}
            </div>
            <div className='flex align-top'>
                <MyButton
                    text={'Answers'}
                    icon={mdiChat}
                    onClick={handleEnterThread}
                    counter={props.post_count}
                    className="mr-2"
                />
                <MyButton
                    className={'bg-pink hover:bg-pink-mid'}
                    icon={mdiCancel}
                    onClick={handleDeleteFromFav}
                />
            </div>
        </div>
    )
}
