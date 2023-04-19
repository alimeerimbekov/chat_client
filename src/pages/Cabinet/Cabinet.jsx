import React, {useRef, useState} from 'react';
import Bg from '../../assets/images/profBg.jpg'
import {Image, useToast} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import {MdAddAPhoto} from "react-icons/md"
import {BsPencilFill} from "react-icons/bs"
import axios from "../../utils/axios";
import {fillUser} from "../../redux/reducers/user";
import EmojiPicker from "emoji-picker-react";
import {GrEmoji} from "react-icons/gr";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {useNavigate} from "react-router-dom";


const Cabinet = () => {

    const {user} = useSelector(userSelector)

    const image = useRef()

    const [selectEmoji, setSelectEmoji] = useState(false)
    const [images, setImages] = useState('')
    const [active, setActive] = useState(false)
    const [post, setPost] = useState('')
    const [none, setNone] = useState(false)
    const [name, setName] = useState('')
    const [reName, setReName] = useState(false)

    const dispatch = useDispatch()
    const toast = useToast()
    const navigate = useNavigate()


    const handleImage = async (e) => {
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)

            await axios.post('/upload', formData)
                .then(({data}) => setImages(data.url))

        } catch (err) {
            console.log(e)
            console.log(err, 'Ошибка')
            alert('Ошибка при загрузке файла')
            toast({
                title: 'Ошибка при загрузке файла',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
        }

    }

    const resetHandler = () => {
        setImages('')
    }

    const addPhoto = async () => {

        try {
            const res = await axios.patch(`/users/${user._id}/addimage`, {
                image: images
            })
            dispatch(fillUser(res.data))
            setImages('')
            setActive(false)
            toast({
                title: 'Фото успешно добавлено',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
        } catch (err) {
            toast({
                title: 'Не удалось добавить фото',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
        }
    }

    const addPost = async () => {
        try {
            const res = await axios.patch(`/users/${user._id}/addpost`, {
                post
            })
            dispatch(fillUser(res.data))
            setPost('')
            setNone(false)
            toast({
                title: 'Успешно обновлено',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
        } catch (err) {
            toast({
                title: 'Не удалось обновить',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
        }
    }

    const rename = async () => {
        try {
            const res = await axios.patch(`/users/${user._id}/rename`, {
                name
            })
            dispatch(fillUser(res.data))
            setName('')
            setReName(false)
            toast({
                title: 'Вы изменили имя',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
        } catch (err) {
            toast({
                title: 'Не удалось изменить имя',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
        }
    }

    return (
        <section className='cabinet'>
            <div className="cabinet__gen">
                <img src={Bg} alt="" className='cabinet__bg'/>
                <div className="container">
                    <div className="cabinet__content">
                        <div className="cabinet__left">
                            <div className="cabinet__left-title" style={{display: 'flex', alignItems: 'center', columnGap: '100px', paddingLeft: '50px'}}>
                                <p onClick={() => navigate('/')}><AiOutlineArrowLeft size={30} cursor={'pointer'}/></p>
                                <h2>Профиль</h2>
                            </div>
                            <div className="cabinet__left-img">
                                <Image
                                    borderRadius='full'
                                    boxSize='250px'
                                    src={`${process.env.REACT_APP_URL}${user.image}`}
                                    alt={user.name}/>
                                <span onClick={() => setActive(true)}><MdAddAPhoto size={40} fill={'red'}/></span>
                            </div>
                            <div className="cabinet__left-info">
                                <p className="cabinet__left-name">
                                    {
                                        reName ?
                                            <>
                                                <input value={name} onChange={(e) => setName(e.target.value)}
                                                       type="text" className='cabinet__left-rename'
                                                       placeholder='Введите имя...'/>
                                                <button className="cabinet__left-btn" onClick={rename}>Изменить</button>
                                            </> : <>{user.name}<BsPencilFill onClick={() => setReName(true)}/></>
                                    }

                                </p>
                                <p className="cabinet__left-number">+996 {user.phone}</p>
                            </div>
                            {
                                none &&
                                <div className="cabinet__left-bio">
                                    <div className="cabinet__left-add">
                                    <textarea value={post} onChange={(e) => setPost(e.target.value)}
                                              className='cabinet__left-field' placeholder='О себе ...'/>
                                        <span className='cabinet__left-add-block'>
                                       {
                                           selectEmoji ?
                                               <div className='chat__bottom-emoji-block'
                                                    onMouseLeave={() => setSelectEmoji(false)}>
                                                   <EmojiPicker
                                                       onEmojiClick={(emoji) => setPost(prev => post + emoji.emoji)}/>
                                               </div>
                                               :
                                               <>
                                                   <GrEmoji onMouseEnter={() => setSelectEmoji(true)} size={28}/>
                                               </>
                                       }
                                    </span>
                                    </div>
                                    <button className="cabinet__left-btn" onClick={addPost}>Опубликовать</button>
                                </div>
                            }
                            {
                                !none &&
                                <div className="cabinet__left-post">
                                    <p>{user.post}</p>
                                    <BsPencilFill onClick={() => setNone(true)} size={20}/>
                                </div>
                            }


                        </div>
                        <div className="cabinet__right">
                            <div className="cabinet__right-title">
                                <h2>О пользователе</h2>
                            </div>
                            <h3 className='cabinet__right-subtitle'>История профиля</h3>
                            <div className="cabinet__right-content">
                                <div className="cabinet__right-card">
                                    <p className="cabinet__right-name">Статус:</p>
                                    <p className="cabinet__right-text">{user.post}</p>
                                </div>
                                <div className="cabinet__right-card">
                                    <p className="cabinet__right-name">Зарегистрирован:</p>
                                    <p className="cabinet__right-text">{user.createdAt.slice(0, 10)}</p>
                                </div>
                                <div className="cabinet__right-card">
                                    <p className="cabinet__right-name">Обновлен:</p>
                                    <p className="cabinet__right-text">{user.updatedAt.slice(0, 10)}</p>
                                </div>
                                <div className="cabinet__right-card">
                                    <p className="cabinet__right-name">Последняя активность:</p>
                                    <p className="cabinet__right-text"></p>
                                </div>
                                <div className="cabinet__right-card">
                                    <p className="cabinet__right-name">Город:</p>
                                    <p className="cabinet__right-text">Бишкек</p>
                                </div>
                            </div>
                        </div>
                        <div className="cabinet__box" style={{display: active ? 'flex' : 'none'}}>
                            <div className="cabinet__box-tr">
                                <h3 className="cabinet__box-title">Загрузить фото профиля</h3>
                                <Image
                                    className="cabinet__box-img"
                                    borderRadius='full'
                                    boxSize='250px'
                                    src={`${process.env.REACT_APP_URL}${images}`}
                                    alt={user.name}
                                />
                                {
                                    !images ?
                                        <div>
                                            <button onClick={() => image.current.click()}
                                                    className="cabinet__box-btn">Загрузить
                                            </button>
                                            <input ref={image} hidden type="file" onChange={handleImage} id='image'/>
                                        </div>
                                        :
                                        <div className='cabinet__box-btns'>
                                            <button onClick={() => {
                                                resetHandler()
                                                setActive(!active)
                                            }} className="cabinet__box-btn">Отменить
                                            </button>
                                            <button onClick={addPhoto} className="cabinet__box-btn">Сохранить</button>
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cabinet;