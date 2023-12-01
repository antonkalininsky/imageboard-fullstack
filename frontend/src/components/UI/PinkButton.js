import React from 'react'

export default function PinkButton(props) {
  return (
    <button
        className={'bg-light text-gray-dark p-6 rounded-lg text-center font-semibold hover:bg-light-darker ' + props.className}
        onClick={props.onClick}
    >
        {props.children}
    </button>
  )
}
