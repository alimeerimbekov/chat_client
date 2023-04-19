import React, {useEffect, useState} from 'react';
import Aside from "../../components/Aside/Aside";
import Chat from "../Chat/Chat";
import Companion from "../../components/Companion/Companion";
import {useDispatch, useSelector} from "react-redux";
import {getChatSelector, userSelector} from "../../redux/reselect";
import {getAllChats} from "../../redux/reducers/getChats";


const Home = () => {

    const {user} = useSelector(userSelector)
    const {data} = useSelector(getChatSelector)

    const dispatch = useDispatch()

    const [block, setBlock] = useState(false)
    const [blockGroup, setBlockGroup] = useState(false)

    useEffect(() => {
        dispatch(getAllChats({_id: user._id}))
    }, [data])



    return (
        <>
            <div className='left'>
                <Aside data={data}/>
            </div>
            <div className='right'>
                <Chat chat={data} setBlock={setBlock} block={block}/>
                <Companion chat={data} blockGroup={blockGroup} setBlockGroup={setBlockGroup} block={block} setBlock={setBlock}/>
            </div>
        </>
    );
};

export default Home;