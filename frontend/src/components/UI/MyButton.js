import React from 'react'
import Icon from '@mdi/react'


export default function MyButton(props) {
    return (
        <button
            className={'bg-gray-light text-gray-darker rounded-2xl p-2 font-semibold text-sm flex items-center hover:bg-gray-mid ' + props.className}
            onClick={props.onClick}
        >
            {
                props.icon
                    ? <Icon path={props.icon} size={1} className={
                        props.text
                            ? 'mr-1'
                            : ''
                    } />
                    : <></>
            }
            <div>{props.text}</div>
            {
                props.counter
                    ? <div className='text-white bg-pink px-2 rounded-r-lg ml-2'>{props.counter}</div>
                    : <></>
            }
        </button>
    )
}
