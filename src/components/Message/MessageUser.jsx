import React from 'react';
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import MessageId from "./MessageId";


const MessageUser = ({users, message}) => {

    const {user} = useSelector(userSelector)

    return (
        <div className='chat__message' key={message.chatId}
             style={{alignItems: message.sender === user._id ? 'flex-end' : 'flex-start'}}>

            <p className='chat__message-text'
               style={{background: message.sender === user._id ? 'blueviolet' : '#222'}}
               key={message.chatId}>
                {
                    users.map((item) => (
                        <MessageId message={message} id={item}/>
                    ))
                }
                <p className="chat__message-text-time">
                    <p className='chat__message-text-desc'>{message.text}</p>
                    <span>{message.createdAt.slice(11, 16)}</span>
                </p>
            </p>
        </div>
    );
};

export default MessageUser;