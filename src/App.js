import React, {Suspense} from "react";
import Auth from "./routing/Auth/Auth";
import Private from "./routing/Private/Private";
import {useSelector} from "react-redux";
import {userSelector} from "./redux/reselect";
import './styles/style.scss'

function App() {

    const {user} = useSelector(userSelector)

    return (
        <Suspense fallback={'...Loading'}>
            {

                !user.phone.length ?
                    <Auth/>
                    :
                    <Private/>
            }
        </Suspense>
    );
}

export default App;
