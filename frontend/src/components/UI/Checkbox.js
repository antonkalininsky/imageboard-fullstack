import React from 'react'
import { useState } from 'react'

export default function Checkbox(props) {
    const [value, setValue] = useState(false)

    const handleChange = (e) => {
        setValue(e.target.checked)
        props.updateValue(e.target.checked)
    }

    return (
        <label className='flex items-center cursor-pointer'>
            <input
                type="checkbox"
                className='block mr-2'
                checked={value}
                onChange={handleChange}
            />
            <div className='block text-white'>
                {props.children}
            </div>
        </label>
    )
}
