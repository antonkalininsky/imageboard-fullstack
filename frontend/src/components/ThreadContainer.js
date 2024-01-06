import React, { useEffect, useState } from 'react'
import MyButton from './UI/MyButton'
import { mdiChat } from '@mdi/js';
import { useNavigate } from 'react-router-dom'
import moment from 'moment/moment';
import FavThreadButton from './FavThreadButton';
import TextStylizer from '../services/TextStylizer';

export default function ThreadContainer(props) {

  const [text, setText] = useState()

  useEffect(() => {
    const stylizedText = TextStylizer.stylizeLine(props.content)
    setText(stylizedText)
  }, [props.content])

  const navigate = useNavigate()

  const handleEnterThread = () => {
    navigate(`/thread/${props.id}`)
  }

  return (
    <div className='container text-white bg-gray p-8 max-w-xl mb-6 rounded-xl shadow-main'>
      <h3 className='text-2xl font-semibold mb-5'>{props.title}</h3>
      {/* <div className='flex mb-5'>
            <div>file1</div>
        </div> */}
      <div className='mb-5 text-lg font-medium'>
        {text}
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex'>
          <FavThreadButton id={props.id} />
          <MyButton
            text={'Answer'}
            icon={mdiChat}
            counter={props.postCount}
            onClick={handleEnterThread}
          />
        </div>
        <div>
          {moment(props.createdAt).format('HH:mm:ss DD.MM.YYYY')}
        </div>
      </div>
    </div>
  )
}
