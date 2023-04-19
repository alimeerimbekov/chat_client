import React, {useEffect, useState} from 'react';
import axios from "../../utils/axios";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";
import {Avatar} from "@chakra-ui/react";

const GroupUser = ({id}) => {

    const {user} = useSelector(userSelector)

    const [member, setMember] = useState({})

    useEffect(() => {
        axios(`/users/${id}`).then(({data}) => setMember(data))
    }, [])

    return (
        <div className='users__card'>
            <Avatar
                src={`${process.env.REACT_APP_URL}${member.image}`}
                name={member.name}/>
            <div>
                <h3 className='users__name'>
                    {member.name === user.name ? 'Вы' : member.name}
                </h3>
            </div>
        </div>
    );
};

export default GroupUser;