import React from 'react';
import {Route, Routes} from "react-router-dom";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import NotFound from "../../pages/NotFound/NotFound";


const Auth = () => {
    return (
       <Routes>
           <Route path='register' element={<Register/>}/>
           <Route path='login' element={<Login/>}/>
           <Route path='*' element={<NotFound/>}/>
       </Routes>
    );
};

export default Auth;