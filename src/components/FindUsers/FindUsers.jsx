import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {findUserSelector, userSelector} from "../../redux/reselect";
import {changeSearch, findAllUser} from "../../redux/reducers/findUsers";
import OneUser from "./OneUser";

const FindUsers = ({search, setActive}) => {

    const {user} = useSelector(userSelector)

    const dispatch = useDispatch()

    const {data} = useSelector(findUserSelector)

    const [chatUser, setChatUser] = useState({})


    useEffect(() => {
        dispatch(findAllUser({name: user.name, search}))
        dispatch(changeSearch(search))
    }, [search])


    return (
        <div className='users'>
            {
                data.map((item) => (
                    <OneUser setActive={setActive} key={item._id} item={item} chatUser={chatUser} setChatUser={setChatUser}/>
                ))
            }
        </div>
    );
};

export default FindUsers;