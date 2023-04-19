import React, {useEffect, useState} from 'react';
import {Avatar} from "@chakra-ui/react";
import axios from "../../utils/axios";
import {useNavigate, useParams} from "react-router-dom";

const ChatUser = ({id, chatId}) => {

    const [companion, setCompanion] = useState({})

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios(`/users/${id}`).then(({data}) => setCompanion(data))
    }, [])

    return (
        <div onClick={() => navigate(`/${chatId}`)}
             style={{background: params.id === chatId ? 'blueviolet' : 'transparent', borderRadius: '20px'}}
             className='users__card'>
            <Avatar
                name={companion.name}
                src={`${process.env.REACT_APP_URL}${companion.image}`}
            />
            <div>
                <h3 className='users__name'>{companion.name}</h3>
                <p className='users__phone'>

                </p>
            </div>
        </div>
    );
};

export default ChatUser;