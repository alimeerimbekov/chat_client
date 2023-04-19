import React, {useEffect, useState} from 'react';
import {Avatar} from "@chakra-ui/react";
import axios from "../../utils/axios";
import {useParams} from "react-router-dom";

const ChatId = ({setBlock, id, chatId, groups}) => {

    const [userId, setUserId] = useState({})

    const params = useParams()

    useEffect(() => {
            axios(`/users/${id}`).then(({data}) => setUserId(data))
    }, [])


    return (
        <>
            {
                chatId === params.id ?
                    <div className='chat__popover-top' onClick={() => setBlock(true)}>
                        <Avatar
                            className='chat__avatar'
                            name={userId.name}
                            src={`${process.env.REACT_APP_URL}${userId.image}`}
                        />

                        <div>
                            <h3 className='chat__popover-title'>{userId.name}</h3>
                            <p className='chat__popover-time'></p>
                        </div>
                    </div>
                    : ''
            }
        </>
    );
};

export default ChatId;