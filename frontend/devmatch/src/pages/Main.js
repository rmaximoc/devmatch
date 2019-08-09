import React, { useEffect, useState } from 'react'
//importar {link} e relacionar com um elemento jsx
import './Main.css'

import api from '../services/api'

export default function Main({ match }) {
    const [users, setUsers] = useState([])

    useEffect(()=> {
        (async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })
            setUsers(response.data)
         })()
    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        })

        setUsers(users.filter(user => user._id !== id))
    }

    return(
        <div className='main-container'>
            { users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className='button'>
                                <button type='button' onClick={() => handleDislike(user._id)}>
                                    x
                                </button>
                                <button type='button' onClick={() => handleLike(user._id)}>
                                    y
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className='empty'>It's over </div>
            )}
        </div>
    )
}