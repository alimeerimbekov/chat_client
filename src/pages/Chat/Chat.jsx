import React, {useEffect, useState} from 'react';
import Bg from "../../assets/images/bg.jpg";
import {
    Button,
    Icon,
    Input,
    Popover,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger, useToast
} from "@chakra-ui/react";
import {CgProfile} from "react-icons/cg";
import {BiSend} from "react-icons/bi";
import {AiFillSetting, AiOutlineArrowLeft, AiFillDelete} from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";
import {GrEmoji} from "react-icons/gr";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {getGroupSelector, userSelector} from "../../redux/reselect";
import ChatId from "../../components/ChatId/ChatId";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../utils/axios";
import {getAllGroups} from "../../redux/reducers/getGroups";
import GroupTop from "../../components/GroupTop/GroupTop";
import Message from "../../components/Message/Message";


const Chat = ({setBlock, block, chat}) => {

    const {user} = useSelector(userSelector)
    const {data} = useSelector(getGroupSelector)

    const [selectEmoji, setSelectEmoji] = useState(false)
    const [post, setPost] = useState('')
    const [getMess, setGetMess] = useState({})


    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()


    const sendMessage = async () => {
        try {
            await axios.post('messages/send', {
                chatId: params.id,
                sender: user._id,
                text: post
            })
            toast({
                title: 'Отправлено',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
            setPost('')

        } catch (err) {
            toast({
                title: 'Не отправлено',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            })
        }
    }

    useEffect(() => {
        axios(`/messages/${params.id}`).then(({data}) => setGetMess(data))
        dispatch(getAllGroups({_id: user._id}))
    }, [getMess])

    const delChat = async () => {

        try {
            await axios.delete(`/chats/${params.id}`)
                .then(({data}) => {
                    console.log(data)
                })
            navigate('/')
            toast({
                title: 'Чат удален',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'center-top'
            })
        } catch (err) {
            toast({
                title: 'Не удалось удалить чат',
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


    return (
        <div className='chat' style={{width: !block ? '100%' : '70%'}}>
            <img id={'chatBg'} src={Bg} alt=""/>
            <div className="chat__content">
                <div className="chat__top">
                    <div className="chat__popover">
                        <div className="chat__left">
                            <span onClick={() => navigate('/')}><AiOutlineArrowLeft size={20}/></span>
                            {
                                chat.map((item) => (
                                    <ChatId key={item._id} chatId={item._id}
                                            id={item.members.filter(el => el !== user._id)}
                                            setBlock={setBlock} block={block}/>
                                ))
                            }
                            {
                                data?.map((group) => (
                                    <GroupTop key={group._id} group={group}
                                              chatId={group._id} users={group.members}
                                              setBlock={setBlock} block={block}
                                    />
                                ))
                            }
                        </div>
                        <Popover placement='left'>
                            <PopoverTrigger>
                                <Button bg={'transparent'} className='aside__button'>
                                    <BsThreeDotsVertical size={20}/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='aside__popover-content'>
                                <PopoverCloseButton/>
                                <div className="aside__popover-div">
                                    <ul className='aside__popover-list'>
                                        <li className='aside__popover-item'>
                                            <Icon as={CgProfile} path={'blueviolet !important'}/>
                                            <span className="aside__popover-text"
                                                  onClick={() => setBlock(true)}>Профиль</span>
                                        </li>
                                        <li className='aside__popover-item' onClick={delGroup}>
                                            <Icon as={AiFillDelete}/>
                                            <span className="aside__popover-text">Удалить группу</span>
                                        </li>
                                        <li className='aside__popover-item' onClick={delChat}>
                                            <Icon as={AiFillDelete}/>
                                            <span className="aside__popover-text">Удалить чат</span>
                                        </li>

                                    </ul>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="chat__block">
                    <div className="chat__center">
                        {
                            params.id ?
                                getMess?.map((message) => (
                                    <Message group={data} message={message}/>

                                )) : ''

                        }
                    </div>
                    <>
                        {
                            params.id ?
                                <div className="chat__bottom">
                                    <Input value={post} onChange={(e) => setPost(e.target.value)}
                                           className='chat__bottom-field'
                                           placeholder={'Сообщение...'}/>
                                    <span className='chat__bottom-emoji'>
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
                                    <button type={'button'} className='chat__bottom-btn'
                                            onClick={sendMessage}>
                                        <BiSend size={22}/>
                                    </button>
                                </div> : ''
                        }
                    </>

                </div>
            </div>
        </div>
    );
};

export default Chat;