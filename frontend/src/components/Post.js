import React from 'react'

export default function Post(props) {
  return (
    <>
      <div className='text-white w-full mb-5 break-words'>{props.text}</div>
      <div className='w-full h-1 bg-gray-darker mb-5'></div>
    </>
  )
}
