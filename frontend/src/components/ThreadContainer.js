import React from 'react'
import MyButton from './UI/MyButton'
import { mdiChat, mdiBookmark } from '@mdi/js';
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment';

export default function ThreadContainer(props) {

  const navigate = useNavigate()

  const handleEnterThread = () => {
    navigate(`/thread/${props.id}`)
  }

  const handleAddFavourite = () => {
    // todo
  }

  return (
    <div className='container text-white bg-gray p-8 max-w-xl mb-6 rounded-xl shadow-main'>
      <h3 className='text-2xl font-semibold mb-5'>{props.title}</h3>
      {/* <div className='flex mb-5'>
            <div>file1</div>
        </div> */}
      <div className='mb-5 text-lg font-medium'>
        {props.content}
      </div>
      <div className='flex justify-between items-center'>
        {/* <MyButton icon={mdiBookmark} counter={false} onClick={handleAddFavourite} /> */}
        <MyButton text={'Answer'} icon={mdiChat} counter={props.post_count} onClick={handleEnterThread} />
        <div>
          {moment(props.created_at).format('hh:mm:ss DD.MM.YYYY')}
        </div>
      </div>
    </div>
  )
}
