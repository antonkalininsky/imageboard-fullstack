import React, { useState } from 'react'
import classes from './postform.module.css'

export default function PostForm(props) {
    const [text, setText] = useState('')
    
    const handleButtonClick = () => {
        props.submit(text)
        setText('')
    }
    
    return (
        <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} className={classes.textarea}></textarea>
            <button onClick={handleButtonClick} className={classes.button}>Отправить</button>
        </div>
    )
}
