import { useState } from "react"

let instance = null

const useFavThreadHook = () => {
    const [favThreadList, setFavThreadsList] = useState([])

    const readFavThreadListFromLocalStorage = () => {
        console.log('check');
        setFavThreadsList(JSON.parse(localStorage.getItem('favourites')) || [])
    }

    const writeFavThreadListToLocalStorage = () => {
        localStorage.setItem('favourites', JSON.stringify(favThreadList))
    }


    if (!instance) {
        readFavThreadListFromLocalStorage()

        instance = {
            toggleItem: (id) => {
                const index = favThreadList.findIndex((item) => item === id)
                if (index === -1) {
                    favThreadList.push(id)
                } else {
                    favThreadList.splice(index, 1)
                }
                writeFavThreadListToLocalStorage()
            },
            getList: favThreadList
        }
    }

    return instance
}

export default useFavThreadHook