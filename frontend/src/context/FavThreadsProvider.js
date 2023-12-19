import React, { useState, useEffect } from "react"
import FavThreadsContext from "./FavThreadsContext"

const LOCAL_STORAGE_SIZE = 100

const FavThreadsProvider = ({ children }) => {
    const [inited, setInited] = useState(false)
    const [favThreads, setFavThreads] = useState([])

    useEffect(() => {
        setFavThreads(JSON.parse(localStorage.getItem('favourites')) || [])
        setInited(true)
    }, [])

    useEffect(() => {
        if (!inited) return
        if (favThreads.length > LOCAL_STORAGE_SIZE) {
            setFavThreads(favThreads.slice(favThreads.length / 2))
        }
        localStorage.setItem('favourites', JSON.stringify(favThreads))
    }, [favThreads])

    const toggleItem = (id) => {
        const bufArray = [...favThreads]
        const index = favThreads.findIndex((item) => item === id)
        if (index === -1) {
            bufArray.push(id)
        } else {
            bufArray.splice(index, 1)
        }
        setFavThreads(bufArray)
    }

    const checkId = (id) => {
        return favThreads.includes(id)
    }

    return (
        <FavThreadsContext.Provider value={{ favThreads, toggleItem, checkId }}>
            {children}
        </FavThreadsContext.Provider>
    )
}

export default FavThreadsProvider