import React, {useState} from 'react';
import Groups from "./Groups";
import {useSelector} from "react-redux";
import {findUserSelector, userSelector} from "../../redux/reselect";
import Members from "./Members";
import axios from "../../utils/axios";


const CreateGroup = () => {

    const {user} = useSelector(userSelector)
    const {data} = useSelector(findUserSelector)

    const [box, setBox] = useState(1)
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')

    let arr = Array.from(id.split(' ')).slice().filter((item) => item !== '')

    const createGroup = () => {

        let group = {
            title,
            members: [user._id, arr].flat(),
            admin: user._id
        }
        axios.post(`/group`, group)
            .then(({data}) => console.log(data))
            .catch((err) => console.log(err))
        setTitle('')
        setBox(1)
    }


    return (
        <div className='groups'>
            <div className="groups__top">
                <button className={`groups__btn ${box === 1 ? 'active' : ''}`} onClick={() => setBox(1)}>
                    Мои группы
                </button>
                <button className={`groups__btn ${box === 2 ? 'active' : ''}`} onClick={() => setBox(2)}>
                    Создать группу
                </button>
            </div>

            <div className="groups__content" style={{display: box === 1 ? 'block' : 'none'}}>
                <Groups/>
            </div>
            <div className="groups__content" style={{display: box === 2 ? 'block' : 'none'}}>
                <div className="groups__box">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text"
                           placeholder='Введите название группы' required className='groups__field'/>
                    <div className='groups__center'>
                        <h2 className='groups__title'>Выберите участников</h2>
                        <button className='groups__btns' onClick={createGroup}>Создать</button>
                    </div>
                    {
                        data.map((item) => (
                            <Members key={item._id} id={id} item={item} setBox={setBox} setId={setId}/>
                        ))
                    }

                </div>
            </div>
        </div>

    );
};

export default CreateGroup;