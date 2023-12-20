import React, { useState } from 'react'
import MyInput from './UI/MyInput'
import MyTextArea from './UI/MyTextArea'
import PinkButton from './UI/PinkButton'
import ThreadAxiosController from '../controllers/ThreadAxiosController'
import useDataSending from '../hooks/useDataSending'
import UserIdentificator from '../services/UserIdentificator'

export default function ThreadForm(props) {
    const { sendData } = useDataSending(ThreadAxiosController.createThread)

    const [form, setForm] = useState({
        title: '',
        content: ''
    })

    const handleButtonClick = async () => {
        await sendData({...form, userId: UserIdentificator.getUserId()})
        setForm({
            title: '',
            content: ''
        })
        props.triggerUpdate()
    }

    const handleHeaderChange = (e) => {
        setForm({
            ...form,
            title: e.target.value
        })
    }

    const handleTextChange = (e) => {
        setForm({
            ...form,
            content: e.target.value
        })
    }

    return (
        <div className='flex flex-col justify-start items-center w-1/4'>
            <MyInput className="w-full mb-2 mt-5" value={form.title} onChange={handleHeaderChange} />
            <MyTextArea className="w-full mb-2" value={form.content} onChange={handleTextChange} />
            <PinkButton className="w-3/4 mb-8" onClick={handleButtonClick}>Add Thread</PinkButton>
        </div>
    )
}
