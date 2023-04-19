import React from 'react';
import {Avatar} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

const GroupId = ({item}) => {

    const navigate = useNavigate()

    return (
        <div className='users__card' onClick={() => navigate(`/${item._id}`)}>
            <Avatar
                src={`${process.env.REACT_APP_URL}${item.image}`}
                name={item.title}/>
            <div>
                <h3 className='users__name'>{item.title}</h3>
                <p className='users__phone'></p>
            </div>
        </div>
    );
};

export default GroupId;