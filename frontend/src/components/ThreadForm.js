import React, { useState } from 'react'
import MyInput from './UI/MyInput'
import MyTextArea from './UI/MyTextArea'
import PinkButton from './UI/PinkButton'
import ThreadAxiosController from '../controllers/ThreadAxiosController'
import useDataSending from '../hooks/useDataSending'
import UserIdentificator from '../services/UserIdentificator'
import MyButton from './UI/MyButton'
import TextStylizer from '../services/TextStylizer'

export default function ThreadForm(props) {
    // hooks
    const { sendData, loading } = useDataSending(ThreadAxiosController.createThread)
    const [form, setForm] = useState({
        title: '',
        content: ''
    })
    const [selected, setSelected] = useState({
        start: 0,
        end: 0
    })

    // foos
    const handleButtonClick = async () => {
        await sendData({ ...form, userId: UserIdentificator.getUserId() })
        setForm({
            title: '',
            content: ''
        })
        props.triggerUpdate()
    }

    const handleStylingButton = (styler) => () => {
        const result = TextStylizer.addingStylingCharacters(form.content, styler, selected)
        setForm({
            ...form,
            content: result
        })
    }

    const handleTextAreaMouseMovement = (e) => {
        setSelected({
            start: e.target.selectionStart,
            end: e.target.selectionEnd
        })
    }

    return (
        <div className='flex flex-col justify-start items-center w-1/4'>
            <MyInput className="w-full mb-2 mt-5" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <MyTextArea
                className={"w-full mb-2"}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                onMouseUp={handleTextAreaMouseMovement}
                onMouseEnter={handleTextAreaMouseMovement}
                onMouseLeave={handleTextAreaMouseMovement}
            />
            <div className='w-full flex my-2 items-center justify-center'>
                <MyButton className='mr-1' text={'italic'} onClick={handleStylingButton('*')} />
                <MyButton className='mr-1' text={'bold'} onClick={handleStylingButton('**')} />
                <MyButton className='mr-1' text={'header'} onClick={handleStylingButton('#')} />
                <MyButton text={'quote'} onClick={handleStylingButton('>')} />
            </div>
            <PinkButton className="w-3/4" onClick={handleButtonClick} disabled={loading}>Add Thread</PinkButton>
        </div>
    )
}
