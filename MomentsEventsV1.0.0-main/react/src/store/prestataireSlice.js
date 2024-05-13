import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from '../axios-client';

const initialState = {
    prestataires: [],
    status: null,
}

export const prestatairesFetch = createAsyncThunk(
    'prestataires/prestatairesFetch',
    //documentation pour la fonction async(param1, param2): https://redux-toolkit.js.org/api/createAsyncThunk
    async (id=null, { rejectWithValue }) => {
        try {
        const response = await axiosClient.get(`/prestataires`);
        return response?.data.data;
        } catch (err) {
        return rejectWithValue(err.response.data);
        }
    }
);



const prestatairesSlice = createSlice({
    name: 'prestataire',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [prestatairesFetch.pending]: (state, action) => {
            state.status = 'loading';
        },
        [prestatairesFetch.fulfilled]: (state, action) => {
            state.status = 'success';
            state.prestataires = action.payload;
        },
        [prestatairesFetch.rejected]: (state, action) => {
            state.status = 'failed';
        },
    }

});


export default prestatairesSlice.reducer;