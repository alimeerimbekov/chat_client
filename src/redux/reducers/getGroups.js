import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../utils/axios";


export const getAllGroups = createAsyncThunk(
    'getGroup/getAllGroups',
    async (filter, {rejectWithValue}) =>  {
        try {

            const res = await axios(`/group/${filter._id}`)

            if (res.statusText !== 'OK') {
                throw new Error('Error')
            }

            return res.data

        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)



const getGroupSlice = createSlice({
    name: 'getGroup',
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
        [getAllGroups.pending] : (state, action) => {
            state.status = 'Loading...';
            state.error = ''
        },
        [getAllGroups.rejected] : (state, action) => {
            state.status = 'Error';
            state.error = action.payload
        },
        [getAllGroups.fulfilled] : (state, action) => {
            state.status = 'Done';
            state.data = action.payload
        }
    }
})

export default getGroupSlice.reducer