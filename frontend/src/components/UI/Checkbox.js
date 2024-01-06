import React from 'react'

export default function Checkbox({children, ...props}) {

    return (
        <label className='flex items-center cursor-pointer'>
            <input
                type="checkbox"
                className='block mr-2'
                {...props}
            />
            <div className='block text-white'>
                {children}
            </div>
        </label>
    )
}
