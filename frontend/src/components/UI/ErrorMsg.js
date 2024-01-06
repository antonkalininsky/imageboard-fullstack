import React from 'react'
import { mdiAlert } from '@mdi/js'
import Icon from '@mdi/react'

export default function ErrorMsg() {
  return (
    <div className='text-white font-bold bg-gray-darker rounded-lg p-8 my-5'>
        <Icon path={mdiAlert} size={1} className='text-pink inline-block mr-2'/>
        Something went <span className='text-pink'>wrong</span>, please try later
    </div>
  )
}
