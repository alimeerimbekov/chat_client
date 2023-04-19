import React, {useEffect} from 'react';
import ComProf from "../ComProf/ComProf";
import {useDispatch, useSelector} from "react-redux";
import {getGroupSelector, userSelector} from "../../redux/reselect";
import {getAllGroups} from "../../redux/reducers/getGroups";
import GroupProf from "../ComProf/GroupProf";

const Companion = ({block, setBlock, chat}) => {

    const {user} = useSelector(userSelector)
    const {data} = useSelector(getGroupSelector)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllGroups({_id: user._id}))
    }, [])


    return (
        <div className='companion' style={{display: block ? 'block' : 'none'}}>
            {
                chat.map((item) => (
                    <ComProf key={item._id} chatId={item._id} id={item.members.filter(el => el !== user._id)}
                             setBlock={setBlock} block={block}/>
                ))
            }
            {
                data?.map((group) => (
                    <GroupProf key={group._id} group={group}
                              chatId={group._id} users={group.members}
                               setBlock={setBlock} block={block}
                    />
                ))
            }
        </div>
    );
};

export default Companion;