import React from 'react';
import MessageUser from "./MessageUser";

const Message = ({message, group}) => {


    return (
        <>
            {
                group.map((member) => (
                    <MessageUser key={member._id} message={message} users={member.members}/>
                ))
            }
        </>
    );
};

export default Message;