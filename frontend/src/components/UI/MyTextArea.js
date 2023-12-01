import React from 'react'

export default function MyTextArea(props) {
  return (
    <textarea
        rows="6"
        className={'resize-none text-white bg-gray-dark rounded-lg border-pink border-2 p-4 text-lg focus:outline-none ' + props.className}
        value={props.value}
        onChange={props.onChange}
    />
  )
}
