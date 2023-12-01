import React, { useState } from 'react'
import PinkButton from './UI/PinkButton'

export default function PostForm(props) {
    const [text, setText] = useState('')

    const handleSubmitPost = () => {
        props.submit(text)
        setText('')
    }

    return (
        <div className={'bg-gray-darker rounded-lg p-3 flex flex-col ' + props.className}>
            <textarea
                rows="6"
                className='block resize-none bg-gray-darker text-white focus:outline-none'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <PinkButton className="w-min self-end" onClick={handleSubmitPost}>Send</PinkButton>
        </div>
    )
}
