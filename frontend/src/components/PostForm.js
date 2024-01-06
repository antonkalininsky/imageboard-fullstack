import React, { useState } from 'react'
import PinkButton from './UI/PinkButton'
import Checkbox from './UI/Checkbox'
import MyInput from './UI/MyInput'
import MyButton from './UI/MyButton'
import TextStylizer from '../services/TextStylizer'
import useDataSending from '../hooks/useDataSending'
import PostAxiosController from '../controllers/PostAxiosController'
import UserIdentificator from '../services/UserIdentificator'

const defaultForm = {
    title: '',
    content: '',
    sage: false,
    isOp: false
}

export default function PostForm(props) {
    
    const { sendData, loading } = useDataSending(PostAxiosController.createPost)

    const [form, setForm] = useState({ ...defaultForm })

    const [selected, setSelected] = useState({
        start: 0,
        end: 0
    })

    const handleSubmitPost = async () => {
        await sendData({
            ...form,
            threadId: props.threadId,
            userId: UserIdentificator.getUserId()
        })
        props.updatePosts()
        setForm({ ...defaultForm })
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
        <div className={'bg-gray-darker rounded-lg p-3 flex flex-col ' + props.className}>
            <div className='font-bold text-white text-lg mb-3 text-center'>Response</div>
            <MyInput
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={'mb-3'}
            />
            <textarea
                rows="6"
                className='block resize-none bg-gray-dark border-pink border-2 text-white focus:outline-none mb-3 p-2 rounded-lg'
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                onMouseUp={handleTextAreaMouseMovement}
                onMouseEnter={handleTextAreaMouseMovement}
                onMouseLeave={handleTextAreaMouseMovement}
            />
            <div className='flex justify-between'>
                <div>
                    <Checkbox updateValue={(value) => setForm({ ...form, sage: value })}>Sage</Checkbox>
                    <Checkbox updateValue={(value) => setForm({ ...form, isOp: value })}>OP</Checkbox>
                </div>
                <div className='flex'>
                    <MyButton className='mr-1' text={'italic'} onClick={handleStylingButton('*')} />
                    <MyButton className='mr-1' text={'bold'} onClick={handleStylingButton('**')} />
                    <MyButton className='mr-1' text={'header'} onClick={handleStylingButton('#')} />
                    <MyButton text={'quote'} onClick={handleStylingButton('>')} />
                </div>
                <PinkButton className="w-min" onClick={handleSubmitPost} disabled={loading}>Send</PinkButton>
            </div>
        </div>
    )
}
