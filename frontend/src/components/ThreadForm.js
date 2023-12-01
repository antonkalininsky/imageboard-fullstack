import React, { useState } from 'react'
import MyInput from './UI/MyInput'
import MyTextArea from './UI/MyTextArea'
import PinkButton from './UI/PinkButton'
import axios from 'axios'

export default function ThreadForm(props) {
    const [form, setForm] = useState({
        header: '',
        text: ''
    })

    const handleButtonClick = async () => {
        await axios.post('/threads', { ...form })
        setForm({
            header: '',
            text: ''
        })
        props.triggerUpdate()
    }

    const handleHeaderChange = (e) => {
        setForm({
            ...form,
            header: e.target.value
        })
    }

    const handleTextChange = (e) => {
        setForm({
            ...form,
            text: e.target.value
        })
    }

    return (
        <div className='flex flex-col justify-start items-center w-1/4'>
            <MyInput className="w-full mb-2 mt-5" value={form.header} onChange={handleHeaderChange} />
            <MyTextArea className="w-full mb-2" value={form.text} onChange={handleTextChange} />
            <PinkButton className="w-3/4 mb-8" onClick={handleButtonClick}>Add Thread</PinkButton>
        </div>
    )
}
