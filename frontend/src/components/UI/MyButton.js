import React from 'react'
import Icon from '@mdi/react'


export default function MyButton({ className, icon, text, counter, ...props }) {
    return (
        <button
            className={'bg-gray-light disabled:bg-light-darker text-gray-darker rounded-2xl p-2 font-semibold text-sm flex items-center hover:bg-gray-mid h-min ' + className}
            {...props}
        >
            {
                icon
                    ? <Icon path={icon} size={1} className={
                        text
                            ? 'mr-1'
                            : ''
                    } />
                    : <></>
            }
            <div>{text}</div>
            {
                counter
                    ? <div className='text-white bg-pink px-2 rounded-r-lg ml-2'>{counter}</div>
                    : <></>
            }
        </button>
    )
}
