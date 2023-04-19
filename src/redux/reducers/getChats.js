import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../utils/axios";


export const getAllChats = createAsyncThunk(
    'getChat/getAllChats',
    async (filter, {rejectWithValue}) =>  {
        try {

            const res = await axios(`/chats/${filter._id}`)

            if (res.statusText !== 'OK') {
                throw new Error('Error')
            }

            return res.data

        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)



const getChatSlice = createSlice({
    name: 'getChat',
    initialState :  {
        data: [],
        status : '',
        error : '',
        filter: {
            search: ''
        }
    },
    reducers: {},
    extraReducers: {
        [getAllChats.pending] : (state, action) => {
            state.status = 'Loading...';
            state.error = ''
        },
        [getAllChats.rejected] : (state, action) => {
            state.status = 'Error';
            state.error = action.payload
        },
        [getAllChats.fulfilled] : (state, action) => {
            state.status = 'Done';
            state.data = action.payload
        }
    }
})

export default getChatSlice.reducer