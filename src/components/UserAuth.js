import React, {Component, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const UserAuth = ({ children }) =>  {
    const location = useLocation()

    useEffect(() => {
        console.log('changing location')
    }, [location])

    return (
        <div className="main">
            { children }
        </div>
    )
}

export default UserAuth