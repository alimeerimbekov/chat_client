import React from 'react';
import {Navigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";


const NotFound = () => {

    const {user} = useSelector(userSelector)

    if (!user.phone.length) {
        return (
            <Navigate to={'/login'}/>
        );
    } else {
        return (
            <Navigate to={''}/>
        );
    }
};

export default NotFound;