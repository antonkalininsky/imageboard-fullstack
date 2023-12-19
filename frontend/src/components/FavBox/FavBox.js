import React, { useEffect, useState, useContext } from 'react'
import FavBoxItem from './FavBoxItem'
import useDataFetching from '../../hooks/useDataFetching'
import ThreadAxiosController from '../../controllers/ThreadAxiosController'
import FavThreadsContext from '../../context/FavThreadsContext'
import MyButton from '../UI/MyButton'
import { mdiRefresh, mdiArrowUp, mdiArrowDown } from '@mdi/js'

export default function FavBox() {
    const favThreads = useContext(FavThreadsContext)

    const [isOpen, setIsOpen] = useState(false)
    const [triggerUpdate, setTriggerUpdate] = useState(false)
    const [favThreadsList, setFavThreadsList] = useState([])
    const { data, loading, error, fetchData } = useDataFetching(ThreadAxiosController.getFavThreadsData)

    useEffect(() => {
        if (favThreads.favThreads.length === 0) {
            setFavThreadsList([])
            return
        }
        fetchData(favThreads.favThreads)
    }, [favThreads.favThreads, triggerUpdate])

    useEffect(() => {
        if (data?.length === 0) {
            setFavThreadsList([])
            return
        }
        setFavThreadsList(data.map(item => <FavBoxItem {...item} key={item.id} />))
    }, [data])

    return (
        <div className='fixed w-1/3 max-h-1/3 bg-gray left-0 top-0 rounded-lg border-2 border-primary p-5 overflow-y-scroll overflow-x-hidden'>
            <div className={`flex items-center justify-between align-top ${isOpen && 'mb-6'}`}>
                <div className='text-white text-2xl text-center font-semibold'>
                    Favourites ({favThreadsList.length})
                </div>
                {/* todo - нужна защита от ддоса */}
                <div className='flex align-top'>
                    <MyButton
                        icon={mdiRefresh}
                        onClick={() => setTriggerUpdate(!triggerUpdate)}
                        className={'mr-2'}
                    />
                    <MyButton
                        icon={isOpen ? mdiArrowDown : mdiArrowUp}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>
            </div>
            <div>
                {isOpen && favThreadsList}
            </div>
        </div>
    )
}
