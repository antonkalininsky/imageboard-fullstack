import React from 'react'

export default function PinkButton({ className, children, ...props }) {
  return (
    <button
      className={'bg-light disabled:bg-light-darker text-gray-dark p-6 rounded-lg text-center font-semibold hover:bg-light-darker ' + className}
      {...props}
    >
      {children}
    </button>
  )
}
