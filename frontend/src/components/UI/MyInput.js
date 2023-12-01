import React from 'react'

export default function MyInput(props) {
  return (
    <input
        className={'text-white bg-gray-dark rounded-lg border-pink border-2 p-4 text-lg focus:outline-none ' + props.className}
        value={props.value}
        onChange={props.onChange}
    />
  )
}
