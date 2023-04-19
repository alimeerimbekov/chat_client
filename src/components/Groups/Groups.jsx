import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getGroupSelector, userSelector} from "../../redux/reselect";
import {getAllGroups} from "../../redux/reducers/getGroups";
import GroupId from "./GroupId";

const Groups = () => {

    const {user} = useSelector(userSelector)
    const {data} = useSelector(getGroupSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllGroups({_id: user._id}))
    },[])

    return (
        <>
            {
                data.map((item) => (
                    <GroupId key={item._id} item={item}/>
                ))
            }
        </>
    );
};

export default Groups;