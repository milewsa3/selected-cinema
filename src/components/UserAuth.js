import React, {Component, useEffect} from 'react';
import { useLocation } from 'react-router-dom';


const UserAuth = ({ children }) =>  {
    const location = useLocation()

    useEffect(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/auth/checkUser`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await response.json()
            if (data.user) {
                localStorage.setItem('user', JSON.stringify({user: data.user}))
            } else {
                localStorage.setItem('user', null)
            }
        } catch (err) {
            console.log('Error occurred', err)
        }
    }, [location])

    return (
        <div>
            { children }
        </div>
    )
}

export default UserAuth