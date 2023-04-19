import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../utils/axios";


export const findAllUser = createAsyncThunk(
    'findUser/findAllUser',
    async (filter, {rejectWithValue}) =>  {
        try {

            const res = await axios(`/users?not=${filter.name}&search=${filter.search}`)

            if (res.statusText !== 'OK') {
                throw new Error('Error')
            }

            return res.data

        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)



const findUserSlice = createSlice({
    name: 'findUser',
    initialState :  {
        data: [],
        status : '',
        error : '',
        filter: {
            search: ''
        }
    },
    reducers: {
        changeSearch : (state, action) => {
            state.filter = {
                ...state.filter,
                search: action.payload
            }
        }
    },
    extraReducers: {
        [findAllUser.pending] : (state, action) => {
            state.status = 'Loading...';
            state.error = ''
        },
        [findAllUser.rejected] : (state, action) => {
            state.status = 'Error';
            state.error = action.payload
        },
        [findAllUser.fulfilled] : (state, action) => {
            state.status = 'Done';
            state.data = action.payload
        }
    }
})

export const {changeSearch} = findUserSlice.actions
export default findUserSlice.reducer