import React, {useState} from 'react';
import {DiSenchatouch} from "react-icons/di";
import {Button, Input, InputGroup, InputLeftAddon, InputRightElement, Stack, useToast} from "@chakra-ui/react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {BiErrorCircle} from "react-icons/bi"
import {useDispatch} from "react-redux";
import {fillUser} from "../../redux/reducers/user";
import axios from "../../utils/axios";


const Login = () => {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const dispatch = useDispatch()
    const toast = useToast()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({mode: 'onTouched'})

    const loginUser = data => {
            axios.post('/auth/login', data)
            .then(({ data }) => {
                dispatch(fillUser(data))
                navigate('/')
            })
            .catch((err) => toast({
                title: 'Такого аккаунта не существует',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'center-top'
            }))
    }

    return (
        <section className='register'>
            <div className="container">
                <div className="register__content">
                    <form className="register__form"
                          noValidate onSubmit={handleSubmit(loginUser)}>
                        <span className="register__logo">
                            <DiSenchatouch size={220}/>
                        </span>
                        <div className="register__box">
                            <h1 className="register__title">
                                Log in CHATKG
                            </h1>
                            <Stack style={{display: 'flex', flexDirection: 'column', rowGap: '10px'}} spacing={4}>
                                <InputGroup style={{display: "flex", flexDirection: 'column'}}>
                                    <InputGroup>
                                        <InputLeftAddon color={'#fff'} bg={'blueviolet'} children='+996'/>
                                        <Input placeholder='Enter phone number'
                                               style={{border: errors.phone && '#f5222d 1px solid'}}
                                               type='tel'
                                               {...register('phone', {
                                                   required: {
                                                       value: true,
                                                       message: 'Это поле обязательное',
                                                   },
                                                   pattern: {
                                                       value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/,
                                                       message: 'Заполните номер телефона',
                                                   },
                                               })}
                                               className='register__field'
                                        />
                                    </InputGroup>
                                    <span className='register__error'>
								{errors.phone && <BiErrorCircle fill='#f5222d'/>}
                                        <span className='register__error-text'>
									{errors.phone && errors.phone.message}
								</span>
							</span>
                                </InputGroup>
                                <InputGroup style={{display: "flex", flexDirection: 'column'}}>
                                    <InputGroup size='md'>
                                        <Input
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Enter password'
                                            style={{border: errors.password && '#f5222d 1px solid'}}
                                            {...register('password', {
                                                required: {
                                                    message: 'Enter a password',
                                                    value: true,
                                                },
                                                maxLength: {
                                                    message: 'Maximum length 20 characters',
                                                    value: 20,
                                                },
                                                minLength: {
                                                    message: 'Minimum length 8 characters',
                                                    value: 8,
                                                },
                                                pattern: {
                                                    message: 'Enter your password correctly',
                                                    value: /(?=.*[0-9])(?=.*[a-z]){6,}/g,
                                                },
                                            })}
                                        />
                                        <InputRightElement width='3.5rem'>
                                            <Button bg={'blueviolet'} h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? <AiFillEye className='register__icon' size={20}/>
                                                    : <AiFillEyeInvisible className='register__icon' size={20}/>}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <span className='register__error'>
								{errors.password && <BiErrorCircle fill='#f5222d'/>}
                                        <span className='register__error-text'>
									{errors.password && errors.password.message}
                                    </span>
							    </span>
                                </InputGroup>
                                <Button className='register__btn' type='submit'>Login</Button>
                            </Stack>
                            <p className="register__text">I have an account
                                <Link to={'/register'} className='register__text-login'> register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;