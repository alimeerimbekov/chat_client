import React, {useState} from 'react';
import {Avatar} from "@chakra-ui/react";
import {AiOutlineCheckCircle} from 'react-icons/ai'

const Members = ({item, setId, id}) => {

    const [check, setCheck] = useState(false)

    setTimeout(() => {
        setCheck(false)
    }, 10000)


    return (
        <div key={item._id} className='users__card'
             onClick={() => {
                 setCheck(!check)
                 setId(id + ' ' + item._id)
             }}
        >
            <Avatar
                src={`${process.env.REACT_APP_URL}${item.image}`}
                name={item.name}/>
            <div>
                <h3 className='users__name'>{item.name}</h3>
                <p className='users__phone'>+996 {item.phone}</p>
            </div>
            <span style={{display: check ? 'block' : "none"}}><AiOutlineCheckCircle/></span>
        </div>
    );
};

export default Members;