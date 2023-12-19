import React, { useState, useEffect, useContext } from 'react'
import { mdiBookmark } from '@mdi/js'
import MyButton from './UI/MyButton'
import FavThreadsContext from '../context/FavThreadsContext'

export default function FavThreadButton(props) {
  const favThreads = useContext(FavThreadsContext)

  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    setIsFav(favThreads.checkId(props.id))
  }, [props.id, [...favThreads.favThreads]])

  return (
    <MyButton
      icon={mdiBookmark}
      counter={false}
      onClick={() => favThreads.toggleItem(props.id)}
      className={`mr-2 ${isFav && "bg-primary hover:bg-light-darker"}`}
    />
  )
}
