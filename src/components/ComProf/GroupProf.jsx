import React, {useRef, useState} from 'react';
import {VscChromeClose} from "react-icons/vsc";
import {AiFillDelete} from "react-icons/ai";
import {FaUserFriends} from "react-icons/fa";
import {Box, Image, useToast} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../utils/axios";
import GroupUserProf from "../GroupTop/GroupUserProf";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import {AiFillSave} from "react-icons/ai";
import {BsPencilFill} from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import {GrEmoji} from "react-icons/gr";
import {MdAddAPhoto} from "react-icons/md"


const ComProf = ({chatId, setBlock, block, group}) => {

    const {user} = useSelector(userSelector)

    const images = useRef()
    const navigate = useNavigate()
    const params = useParams()
    const toast = useToast()

    const [title, setTitle] = useState(false)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [imageTrue, setImageTrue] = useState(false)
    const [none, setNone] = useState(false)
    const [post, setPost] = useState('')
    const [emoji, setEmoji] = useState(false)

    const handleImg = async (e) => {
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)

            await axios.post('/upload', formData)
                .then(({data}) => setImage(data.url))

        } catch (err) {
            console.log(e)
            console.log(err, 'Ошибка')
            alert('Ошибка при загрузке файла')
            toast({
                title: 'Ошибка при загрузке файла',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        }

    }
    const reset = () => {
        setImage('')
    }
    const addPhoto = async () => {
        try {
            await axios.patch(`/group/${params.id}/addimage`, {
                image
            })
            setImage('')
            toast({
                title: 'Фото добавлено',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        } catch (err) {
            toast({
                title: 'Не удалось добавить фото',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        }
    }
    const rename = async () => {
        try {
            await axios.patch(`/group/${params.id}/rename`, {
                title: name
            })
            setName('')
            setTitle(!title)
            toast({
                title: 'Успешно изменено',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        } catch (err) {
            toast({
                title: 'Не удалось изменить название',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        }
    }
    const delGroup = async () => {

        try {
            await axios.delete(`/group/${params.id}`)
                .then((res) => console.log(res))
            navigate('/')
            setBlock(!block)
            toast({
                title: 'Группа удалена',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        } catch (err) {
            toast({
                title: 'Не удалось удалить группу',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        }
    }
    const addPost = async () => {
        try {
            await axios.patch(`/group/${params.id}/addpost`, {
                post
            })
            setPost('')
            setNone(false)
            toast({
                title: 'Пост добавлен',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        } catch (err) {
            toast({
                title: 'Не удалось добавить пост',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        }
    }
    const del = () => {
        if (user._id === group.admin){
            return delGroup()
        } else {
            toast({
                title: 'Вы не являетесь Администратором',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        }
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
                            <span onClick={del}><AiFillDelete size={22}/></span>
                        </div>
                        <Box boxSize='full' className='companion__user'>
                            {
                                !imageTrue ?
                                    <Image
                                        boxSize='250px'
                                        src={`${process.env.REACT_APP_URL}${group.image}`}
                                        alt={user.name}
                                        style={{objectFit: 'cover'}}
                                    />
                                    :
                                    <div className='companion__user-image'>
                                        {
                                            !group.image ?
                                                <Image
                                                    boxSize='250px'
                                                    src={`${process.env.REACT_APP_URL}${image}`}
                                                    alt={user.name}
                                                    fallbackSrc='https://via.placeholder.com/150'
                                                /> : <Image
                                                    boxSize='250px'
                                                    src={`${process.env.REACT_APP_URL}${image}`}
                                                    alt={user.name}
                                                />
                                        }
                                        <div className="companion__user-btns">
                                            <button className='companion__user-btn' onClick={reset}>
                                                Отменить
                                            </button>
                                            <button className='companion__user-btn' onClick={() => {
                                                addPhoto()
                                                setImageTrue(!imageTrue)
                                                reset()
                                            }}>
                                                Загрузить
                                            </button>
                                        </div>
                                    </div>
                            }
                            <span onClick={() => {
                                images.current.click()
                                setImageTrue(true)
                            }}>
                                <MdAddAPhoto fill={'red'} size={35}/>
                            </span>
                            <input ref={images} hidden type="file" onChange={handleImg} id='image'/>
                            <div className="companion__bottom">
                                {
                                    title ?
                                        <div className='companion__group-rename'>
                                            <input value={name}
                                                   onChange={(e) => setName(e.target.value)}
                                                   type="text" className='companion__name'
                                                   placeholder='Введите название...'/>
                                            <span onClick={rename}><AiFillSave size={25}/></span>
                                        </div>
                                        :
                                        <p className="companion__name">
                                            {group.title}
                                            <BsPencilFill onClick={() => setTitle(true)}/>
                                        </p>
                                }
                            </div>
                        </Box>
                        <div className="companion__members">
                            <span className='companion__members-top'>
                                <FaUserFriends fill={'blueviolet'} size={20}/> <p>Участники</p></span>
                            <p className="companion__members-user">
                                {
                                    group.members.map((user) => (
                                        <GroupUserProf id={user}/>
                                    ))
                                }
                            </p>
                        </div>
                        <div className="companion__post">
                            {
                                none ?
                                    <div className='companion__post-card'>
                                        <textarea className='companion__post-save' value={post}
                                                  onChange={(e) => setPost(e.target.value)}
                                                  placeholder='О чем думаете...'/>
                                        <span onClick={() => {
                                            addPost()
                                            setNone(!none)
                                        }} style={{position: 'absolute', right: '0'}}><AiFillSave size={25}
                                                                                                  fill={'blueviolet'}/></span>
                                        <span className='companion__post-card-emoji'>
                                       {
                                           emoji ?
                                               <div className='chat__bottom-emoji-block'
                                                    onMouseLeave={() => setEmoji(false)}>
                                                   <EmojiPicker
                                                       onEmojiClick={(emoji) => setPost(prev => post + emoji.emoji)}/>
                                               </div>
                                               :
                                               <>
                                                   <GrEmoji onMouseEnter={() => setEmoji(true)} size={28}/>
                                               </>
                                       }
                                    </span>
                                    </div> :
                                    <div className='companion__post-card'>
                                        <p className="">{group.post}</p>
                                        <span onClick={() => setNone(true)}><BsPencilFill size={25}
                                                                                          fill={'blueviolet'}/></span>
                                    </div>
                            }
                        </div>
                    </div> : ''
            }
        </>
    );
};

export default ComProf;