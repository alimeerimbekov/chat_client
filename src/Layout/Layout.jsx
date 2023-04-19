import React from 'react';
import {Outlet} from "react-router-dom";
import Home from "../pages/Home/Home";


const Layout = () => {
    return (
        <main>
            <div className="container">
                <div className='content'>
                    <Home/>
                    <Outlet/>
                </div>
            </div>

        </main>
    );
};

export default Layout;