import React from 'react';
import {Avatar} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import GroupUser from "./GroupUser";

const GroupTop = ({setBlock, chatId, group, users}) => {

    const params = useParams()

    return (
        <>
            {
                chatId === params.id ?
                    <div className='chat__popover-top' onClick={() => setBlock(true)}>
                        <Avatar
                            className='chat__avatar'
                            name={group.title}
                            src={`${process.env.REACT_APP_URL}${group.image}`}
                        />

                        <div>
                            <h3 className='chat__popover-title'>{group.title}</h3>
                            <p className='chat__popover-time'>
                                {
                                    users.map((user) => (
                                        <GroupUser key={user._id} id={user}/>
                                    ))
                                }
                            </p>
                        </div>
                    </div> : ''
            }
        </>
    );
};

export default GroupTop;