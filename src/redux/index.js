import {configureStore, combineReducers} from "@reduxjs/toolkit";
import user, {fillUser} from "./reducers/user";
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import findUsers from "./reducers/findUsers";
import getChat from "./reducers/getChats";
import getGroup from "./reducers/getGroups";


const rootReducer = combineReducers({
    user,
    findUsers,
    getChat,
    getGroup
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: {
        persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })

})

export const persistor = persistStore(store)
export default store;