import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../../Layout/Layout";
import Cabinet from "../../pages/Cabinet/Cabinet";
import NotFound from "../../pages/NotFound/NotFound";
import Zero from "../../components/Zero";


const Private = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path={':id'} element={<Zero/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>
            <Route path={'/cabinet'} element={<Cabinet/>}/>
        </Routes>
    );
};

export default Private;