import React from 'react'
import moment from 'moment/moment'

export default function Post(props) {
  return (
    <>
      <div className='text-white w-full mb-5'>
        <div className='flex justify-between'>
          <div className='break-words'>{props.title}</div>
          <div className='flex'>
            {
              props.sage && <div className='text-pink mr-2'>sage</div>
            }
            <div className='mr-2 hover:underline cursor-pointer'>
              &gt;&gt;{props.id}
            </div>
            <div>
              {moment(props.created_at).format('hh:mm:ss DD.MM.YYYY')}
            </div>
          </div>
        </div>
        <div className='break-words'>{props.content}</div>
      </div>
      <div className='w-full h-1 bg-gray-darker mb-5'></div>
    </>
  )
}
