import React from 'react'

export default function MyTextArea({className, ...props}) {
  return (
    <textarea
        rows="6"
        {...props}
        className={'resize-none text-white bg-gray-dark rounded-lg border-pink border-2 p-4 text-lg focus:outline-none ' + className}
    />
  )
}
