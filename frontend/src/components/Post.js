import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import TextStylizer from '../services/TextStylizer'

export default function Post(props) {

  const [text, setText] = useState('')

  useEffect(() => {
    const stylizedText = TextStylizer.stylizeLine(props.content)
    setText(stylizedText)
  }, [props.content])

  return (
    <>
      <div className='text-white w-full mb-5'>
        <div className='flex justify-between mb-2'>
          <div className='break-words text-light'>{props.title}</div>
          <div className='flex'>
            {
              props.isOp && <div className='text-green mr-2'>OP</div>
            }
            {
              props.sage && <div className='text-pink mr-2'>sage</div>
            }
            <div className='mr-2 hover:underline cursor-pointer'>
              &gt;&gt;{props.id}
            </div>
            <div>
              {moment(props.createdAt).format('hh:mm:ss DD.MM.YYYY')}
            </div>
          </div>
        </div>
        <div className='whitespace-pre-wrap'>{text}</div>
      </div>
      <div className='w-full h-1 bg-gray-darker mb-5'></div>
    </>
  )
}
