import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from '../axios-client';

const initialState = {
    pack: null,
    quantite: 0,
}

const packSlice = createSlice({
    name: 'pack',
    initialState,
    reducers: {
        ajouterPack: (state, action) => {
            state.pack = action.payload.pack;
            state.quantite = action.payload.quantite;
            return state;
        },
    },
    extraReducers: {
    }
})

export const {ajouterPack} = packSlice.actions;

export default packSlice.reducer;