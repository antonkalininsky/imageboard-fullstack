import React, {useState, useEffect} from 'react'
import { mdiBookmark } from '@mdi/js'
import FavThreadListService from '../services/FavThreadListService'
import MyButton from './UI/MyButton'

export default function FavThreadButton(props) {
    const [isFav, setIsFav] = useState(false)

    const handleAddFavourite = () => {
        FavThreadListService.toggleFavThreadListItem(props.id)
        setIsFav(FavThreadListService.checkFavThreadListItemById(props.id))
      }
    
      useEffect(() => {
        setIsFav(FavThreadListService.checkFavThreadListItemById(props.id))
      }, [props.id])

    return (
        <MyButton
            icon={mdiBookmark}
            counter={false}
            onClick={handleAddFavourite}
            className={`mr-2 ${isFav && "bg-primary hover:bg-light-darker"}`}
        />
    )
}
