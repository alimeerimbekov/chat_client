import React, {useEffect, useState} from 'react';
import axios from "../../utils/axios";
import {useSelector} from "react-redux";
import {userSelector} from "../../redux/reselect";

const GroupUser = ({id}) => {

    const {user} = useSelector(userSelector)

    const [member, setMember] = useState({})

    useEffect(() => {
        axios(`/users/${id}`).then(({data}) => setMember(data))
    }, [])

    return (
            <p className="chat__popover-name">
                {member.name === user.name ? 'Вы' : member.name},
            </p>
    );
};

export default GroupUser;