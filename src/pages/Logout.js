import {Redirect} from "react-router-dom"
import {useEffect} from "react";

const Logout = (props) => {
    useEffect(async() => {
        await fetch(`${process.env.REACT_APP_BACKEND_URI}/auth/logout`, {
            method: 'GET',
            credentials: 'include'
        })
    })

    return (
        <Redirect
            to="/"
        />
    )
}

export default Logout;