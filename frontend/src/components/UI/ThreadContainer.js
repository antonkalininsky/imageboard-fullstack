import React from 'react'
import MyButton from './MyButton'
import { mdiChat, mdiBookmark } from '@mdi/js';

export default function ThreadContainer(props) {

  const test = () => {
    console.log('hellow world');
  }

  return (
    <div className='container text-white bg-gray p-8 max-w-xl mb-6 rounded-xl shadow-main'>
        <h3 className='text-2xl font-semibold mb-5'>{props.header}</h3>
        {/* <div className='flex mb-5'>
            <div>file1</div>
        </div> */}
        <div className='mb-5 text-lg font-medium'>
        {props.text}
        </div>
        <div className='flex space-x-2'>
          <MyButton icon={mdiBookmark} counter={false} onClick={test} />
          <MyButton text={'Ответить'} icon={mdiChat} counter={props.counter} />
        </div>
    </div>
  )
}
