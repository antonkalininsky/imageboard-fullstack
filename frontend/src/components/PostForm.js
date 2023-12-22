import React, { useState } from 'react'
import PinkButton from './UI/PinkButton'
import Checkbox from './UI/Checkbox'
import MyInput from './UI/MyInput'
import MyButton from './UI/MyButton'

const defaultForm = {
    title: '',
    content: '',
    sage: false,
    isOp: false
}

export default function PostForm(props) {
    const [form, setForm] = useState({ ...defaultForm })
    const [selected, setSelected] = useState({
        start: 0,
        end: 0
    })

    const handleSubmitPost = () => {
        props.submit(form)
        setForm({ ...defaultForm })
    }

    const handleStylingButton = (styler) => () => {
        if (selected.start === selected.end) return
        const part1 = form.content.slice(0, selected.start)
        const part2 = form.content.slice(selected.start, selected.end)
        const part3 = form.content.slice(selected.end)
        setForm({
            ...form,
            content: part1 + styler + part2 + styler + part3
        })
    }

    const handleHeaderQuoteButton = (styler) => () => {
        const targetIndex = selected.start
        const text = form.content
        let prevBreakIndex = -1
        let breakIndex = 0
        let safeCount = 0
        while (true) {
            safeCount++
            breakIndex = text.indexOf('\n', prevBreakIndex + 1)
            if (breakIndex >= targetIndex || breakIndex === -1) {
                break
            } else {
                prevBreakIndex = breakIndex
            }
            if (safeCount > text.length) break
        }
        if (prevBreakIndex === -1) {
            setForm({
                ...form,
                content: styler + ' ' + text
            })
        } else {
            const part1 = text.slice(0, prevBreakIndex + 1)
            const part2 = text.slice(prevBreakIndex + 1)
            setForm({
                ...form,
                content: part1 + styler + ' ' + part2
            })
        }
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
                id="post-form-input"
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
                    <MyButton className='mr-1' text={'bold'} onClick={handleStylingButton('*')} />
                    <MyButton className='mr-1' text={'italic'} onClick={handleStylingButton('**')} />
                    <MyButton className='mr-1' text={'header'} onClick={handleHeaderQuoteButton('#')} />
                    <MyButton text={'quote'} onClick={handleHeaderQuoteButton('>')} />
                </div>
                <PinkButton className="w-min" onClick={handleSubmitPost}>Send</PinkButton>
            </div>
        </div>
    )
}
