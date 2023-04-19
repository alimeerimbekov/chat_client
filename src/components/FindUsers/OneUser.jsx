import React from 'react';
import {Avatar, useToast} from "@chakra-ui/react";
import axios from "../../utils/axios";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";

const OneUser = ({item, setChatUser, setActive}) => {

    const {user} = useSelector(userSelector)

    const toast = useToast()

    const newChat = () => {
        axios.post(`/chats`, {
            senderId: user._id,
            recieverId: item._id
        }).then(({data}) => {
            setChatUser(data)
            toast({
                title: 'Чат успешно создан',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
        })
            .catch((err) => toast({
                title: 'Не удалось создать чат',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            }))
    }

    return (
        <div key={item._id} className='users__card' onClick={() => {
            newChat()
            setActive(1)
        }}>
            <Avatar
                src={`${process.env.REACT_APP_URL}${item.image}`}
                name={item.name}/>
            <div>
                <h3 className='users__name'>{item.name}</h3>
                <p className='users__phone'>+996{item.phone}</p>
            </div>
        </div>
    );
};

export default OneUser;