import React, {useEffect, useState} from 'react';
import axios from "../../utils/axios";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";

const MessageId = ({id, message}) => {

    const {user} = useSelector(userSelector)

    const [member, setMember] = useState({})

    useEffect(() => {
        axios(`/users/${id}`).then(({data}) => setMember(data))
    }, [])


    return (
        <p className="chat__message-name" style={{color:  message.sender !== user._id ? 'blueviolet' : 'black'}}>
            {
                message.text ? member._id === message.sender ? member.name ? member._id === user._id ? 'Вы' : member.name : '' : '' : ''
            }
        </p>
    );
};

export default MessageId;