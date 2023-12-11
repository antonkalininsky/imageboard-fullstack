import React, { useState, useEffect } from 'react'
import PinkButton from './UI/PinkButton'
import Checkbox from './UI/Checkbox'
import MyInput from './UI/MyInput'
import MyButton from './UI/MyButton'

export default function PostForm(props) {
    const [form, setForm] = useState({
        title: '',
        content: '',
        sage: false
    })

    const handleSubmitPost = () => {
        props.submit(form)
        setForm({
            title: '',
            content: '',
            sage: false
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
            />
            <div className='flex justify-between'>
                <div>
                    <Checkbox updateValue={(value) => setForm({ ...form, sage: value })}>Sage</Checkbox>
                    {/* <Checkbox updateValue={handleOpChange}>OP</Checkbox> */}
                </div>
                <PinkButton className="w-min" onClick={handleSubmitPost}>Send</PinkButton>
            </div>
        </div>
    )
}
