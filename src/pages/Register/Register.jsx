import React, {useState} from 'react';
import {Input, Stack, InputGroup, InputLeftAddon, InputRightElement, Button, useToast} from "@chakra-ui/react";
import {DiSenchatouch} from 'react-icons/di'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {BiErrorCircle} from "react-icons/bi"
import axios from "../../utils/axios";
import {useDispatch} from "react-redux";
import {fillUser} from "../../redux/reducers/user";

const Register = () => {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast()

    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors},
    } = useForm({mode: 'onTouched'})


    const registerUser = data => {
        const {passwordAgain, ...other} = data
        axios.post('/auth/register', {
            ...other
        })
            .then(({data}) => {
                dispatch(fillUser(data))
                navigate('/')
            })
            .catch(err =>  toast({
                title: 'Не удалось зарегистрироваться',
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
                    <form noValidate className="register__form" onSubmit={handleSubmit(registerUser)}>
                        <span className="register__logo">
                            <DiSenchatouch size={200}/>
                        </span>

                        <div className="register__box">
                            <h1 className="register__title">Sing in CHATKG</h1>
                            <Stack spacing={4}>
                                <InputGroup style={{display: "flex", flexDirection: 'column'}}>
                                    <Input placeholder='Enter name'
                                           style={{border: errors.name && '#f5222d 1px solid'}}
                                           autoComplete={'username'}
                                           {...register('name', {
                                               required: {
                                                   message: 'Enter a login',
                                                   value: true,
                                               },
                                               maxLength: {
                                                   message: 'Maximum length 20 characters',
                                                   value: 20,
                                               },
                                               minLength: {
                                                   message: 'Minimum length 3 characters',
                                                   value: 3,
                                               },
                                           })}/>
                                    <span className='register__error'>
								{errors.name && <BiErrorCircle fill='#f5222d'/>}
                                        <span className='register__error-text'>
									{errors.name && errors.name.message}
								</span>
							</span>
                                </InputGroup>
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
                                <InputGroup style={{display: 'flex', flexDirection: 'column'}}>
                                    <InputGroup size='md'>
                                        <Input
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Enter password'
                                            style={{border: errors.password && '#f5222d 1px solid'}}
                                            autoComplete={'new-password'}
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
                                <InputGroup style={{display: "flex", flexDirection: 'column'}}>
                                    <InputGroup size='md'>
                                        <Input
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Enter password again'
                                            style={{
                                                border: errors.passwordAgain && '#f5222d 1px solid',
                                            }}
                                            {...register('passwordAgain', {
                                                required: {
                                                    message: 'Repeat password',
                                                    value: true,
                                                },
                                                validate: v => {
                                                    if (getValues('password') !== v) {
                                                        return 'Your passwords do no match'
                                                    }
                                                },
                                            })}
                                        />
                                    </InputGroup>
                                    <span className='register__error'>
									{errors.passwordAgain && <BiErrorCircle fill='#f5222d'/>}
                                        <span className='register__error-text'>
										{errors.passwordAgain && errors.passwordAgain.message}
									</span>
								</span>
                                </InputGroup>
                                <Button className='register__btn' type='submit'>Register</Button>
                            </Stack>
                            <p className="register__text">I have an account
                                <Link to={'/login'} className='register__text-login'> login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;