import React, {useEffect, useState} from 'react';
import {VscChromeClose} from "react-icons/vsc";
import {AiFillDelete} from "react-icons/ai";
import {BsFillTelephoneFill} from "react-icons/bs";
import {FaListAlt} from "react-icons/fa";
import {Box, Image, useToast} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../utils/axios";

const ComProf = ({id, chatId, setBlock, block}) => {

    const [userId, setUserId] = useState({})

    const navigate = useNavigate()
    const params = useParams()
    const toast = useToast()

    useEffect(() => {
        axios(`/users/${id}`).then(({data}) => setUserId(data))
    },[])


    const delChat = () => {
        axios.delete(`/chats/${params.id}`)
            .then(({data}) => {
                toast({
                    title: 'Чат удален',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'center-top'
                })
                setBlock(!block)
                navigate('/')

            })
            .catch((err) => toast({
                title: 'Не удалось удалить чат',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            }))
    }

    return (
        <>
            {
                chatId === params.id ?
                    <div className="companion__content">
                        <div className="companion__top">
                            <span onClick={() => setBlock(!block)}><VscChromeClose size={25}/></span>
                            <h1 className="companion__title">
                                Профиль
                            </h1>
                            <span onClick={delChat}><AiFillDelete size={22}/></span>
                        </div>
                        <Box boxSize='full' className='companion__user'>
                            <Image
                                src={`${process.env.REACT_APP_URL}${userId.image}`}
                                alt={userId.name}
                                fallbackSrc='https://via.placeholder.com/250'
                            />
                            <div className="companion__bottom">
                                <p className="companion__name">{userId.name}</p>
                            </div>
                        </Box>
                        <div className="companion__phone">
                            <span><BsFillTelephoneFill size={20}/></span>
                            <p className="companion__number">+996 {userId.phone}</p>
                        </div>
                        <div className="companion__post">
                            <span><FaListAlt size={20}/></span>
                            <p>{userId.post}</p>
                        </div>
                    </div> : ''
            }
        </>
    );
};

export default ComProf;