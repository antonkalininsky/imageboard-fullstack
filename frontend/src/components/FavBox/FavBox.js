import React, {useEffect, useState} from 'react'
import FavBoxItem from './FavBoxItem'
import useDataFetching from '../../hooks/useDataFetching'
import ThreadAxiosController from '../../controllers/ThreadAxiosController'
import useFavThreadHook from '../../hooks/useFavThreadHook'
// import FavThreadListService from '../../services/FavThreadListService'

export default function FavBox() {
    const favThreads = useFavThreadHook()

    const [favThreadsList, setFavThreadsList] = useState([])
    const {data, loading, error, fetchData} = useDataFetching(ThreadAxiosController.getFavThreadsData)

    useEffect(() => {
        console.log(favThreads.getList);
        if (favThreads.getList.length === 0) return
        fetchData(favThreads.getList)
    }, [favThreads.getList])

    useEffect(() => {
        if (!data) return
        setFavThreadsList(data.map(item => <FavBoxItem {...item} key={item.id} />))
    }, [JSON.stringify(data)])

    return (
        <div className='fixed w-1/3 h-1/3 bg-gray left-0 top-0 rounded-lg border-2 border-primary p-5 overflow-y-scroll overflow-x-hidden'>
            <div className='text-white text-2xl text-center font-semibold mb-4'>
                Favourites
            </div>
            <div>
                {favThreadsList}
            </div>
        </div>
    )
}
