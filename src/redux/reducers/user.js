import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    user: {
        phone: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fillUser : (state,action) => {
            state.user = action.payload
        },
        logOutUser : (state,action) => {
            state.user = {phone : ''}
        }
    },

})


export const {fillUser, logOutUser} = userSlice.actions
export default userSlice.reducer;
