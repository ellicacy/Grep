import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from '../axios-client';

const initialState = {
    categories: [],
    status: null,
}

export const categoriesFetch = createAsyncThunk(
    'categories/categoriesFetch',
    //documentation pour la fonction async(param1, param2): https://redux-toolkit.js.org/api/createAsyncThunk
    async (id=null, { rejectWithValue }) => {
        try {
        const response = await axiosClient.get(`/categories`);
        return response?.data.data;
        } catch (err) {
        return rejectWithValue(err.response.data);
        }
    }
);



const categoriesSlice = createSlice({
    name: 'categorie',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [categoriesFetch.pending]: (state, action) => {
            state.status = 'loading';
        },
        [categoriesFetch.fulfilled]: (state, action) => {
            state.status = 'success';
            state.categories = action.payload;
        },
        [categoriesFetch.rejected]: (state, action) => {
            state.status = 'failed';
        },
    }

});


export default categoriesSlice.reducer;