import React, {useState} from 'react';
import {Input} from "@chakra-ui/react";
import {FaSearch} from "react-icons/fa";
import {GiHamburgerMenu} from "react-icons/gi";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverCloseButton,
    Button, Avatar, Icon
} from '@chakra-ui/react'
import {CiLogin} from "react-icons/ci";
import {CgProfile} from "react-icons/cg";
import {logOutUser} from "../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import {findUserSelector, userSelector} from "../../redux/reselect";
import {useNavigate} from "react-router-dom";
import FindUsers from "../FindUsers/FindUsers";
import CreateGroup from "../Groups/CreateGroup";
import UsersChat from "../UsersChat/UsersChat";
import Groups from "../Groups/Groups";

const Aside = ({data}) => {

    const {user} = useSelector(userSelector)
    const {filter} = useSelector(findUserSelector)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [active, setActive] = useState(1)
    const [search, setSearch] = useState(filter.search || '')


    return (
        <aside className='aside'>
            <div className="aside__top">
                <div className="aside__top-up">
                    <div className="aside__menu">
                        <Popover placement='bottom-start'>
                            <PopoverTrigger>
                                <Button bg={'transparent'} className='aside__button'>
                                    <GiHamburgerMenu size={20}/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='aside__popover-content'>
                                <PopoverCloseButton/>
                                <div className="aside__popover-div">
                                    <div className='aside__popover-top' onClick={() => navigate('/cabinet')}>
                                        <Avatar name={user.name}
                                                src={`${process.env.REACT_APP_URL}${user.image}`}
                                        />
                                        <div>
                                            <h3 className='aside__popover-title'>{user.name}</h3>
                                            <p className='aside__popover-num'>+996{user.phone}</p>
                                        </div>
                                    </div>
                                    <ul className='aside__popover-list'>
                                        <li onClick={() => navigate('/cabinet')} className='aside__popover-item'>
                                            <Icon as={CgProfile} path={'blueviolet !important'}/>
                                            <span className="aside__popover-text">Профиль</span>
                                        </li>
                                        <li className='aside__popover-item' onClick={() => {
                                            dispatch(logOutUser())
                                            navigate('/login')
                                        }}>
                                            <Icon as={CiLogin}/>
                                            <span className="aside__popover-text">Выйти</span>
                                        </li>
                                    </ul>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <label className="aside__search">
                        <Input className='aside__search-field' placeholder='search'
                               value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <span className="aside__search-icon">
                        <FaSearch/>
                    </span>
                    </label>
                </div>
                <div className="aside__titles">
                    <h2 className={`aside__title ${active === 1 ? 'active' : ''}`}
                        onClick={() => setActive(1)}>Все чаты</h2>
                    <h2 className={`aside__title ${active === 2 ? 'active' : ''}`}
                        onClick={() => setActive(2)}>Группы</h2>
                    <h2 className={`aside__title ${active === 3 ? 'active' : ''}`}
                        onClick={() => setActive(3)}>Пользователи</h2>
                </div>
            </div>

            <div className="aside__overflow">
                {
                    active === 1 ? <>
                        <UsersChat data={data}/>
                        <Groups/>
                    </> : ''
                }
                {
                    active === 2 ? <CreateGroup/> : ''
                }
                {
                    active === 3 ? <FindUsers search={search} setActive={setActive}/> : ''
                }

            </div>


        </aside>
    );
};

export default Aside;