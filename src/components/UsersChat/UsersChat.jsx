import React from 'react';
import ChatUser from "./ChatUser";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";


const UsersChat = ({data}) => {

    const {user} = useSelector(userSelector)

    return (
        <>
            {
                data.map((item) => (
                    <div className='users'  key={item._id}>
                        <ChatUser  chatId={item._id}
                                  id={item.members.filter(el => el !== user._id)}/>

                    </div>
                ))
            }
        </>
    );
};

export default UsersChat;