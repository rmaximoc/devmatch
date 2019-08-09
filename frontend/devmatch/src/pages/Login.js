import React, { useState } from 'react'
import './Login.css'

import api from '../services/api'

export default function Login({ history }) {
    const [username, setUsername] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await api.post('/devs', {
            username,
        })
        const { _id } = response.data

        history.push(`/devs/${_id}`)
     }

    return(
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Insert Github username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
 }