import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosClient from '../axios-client';

const initialState = {
    prestations: [],
    status: null,
}

export const prestationsFetch = createAsyncThunk(
    'prestations/presationsFetch',
    //documentation pour la fonction async(param1, param2): https://redux-toolkit.js.org/api/createAsyncThunk
    async (id=null, { rejectWithValue }) => {
        try {
        const response = await axiosClient.get(`/prestations`);
        return response?.data;
        } catch (err) {
        return rejectWithValue(err.response.data);
        }
        // const getPrestations = () => {
        //     axiosClient.get('/prestations')
        //         .then(({ data }) => {
        //             console.log(data)
        //             setPrestations(data.data)
        //         })
        //         .catch(({ error }) => {
        //             console.log(error)
                    
        //         })
                
        // }
    }
);



const prestationSlice = createSlice({
    name: 'prestation',
    initialState,
    reducers: {
        addPrestation: (state, action) => {
            state.prestations.push(action.payload);
        },
        removePrestation: (state, action) => {
            state.prestations = state.prestations.filter(prestation => prestation.id !== action.payload.id);
        }
    },
    extraReducers: {
        [prestationsFetch.pending]: (state, action) => {
            state.status = 'loading';
        },
        [prestationsFetch.fulfilled]: (state, action) => {
            state.status = 'success';
            state.prestations = action.payload;
        },
        [prestationsFetch.rejected]: (state, action) => {
            state.status = 'failed';
        },
    }

});

export const {addPrestation, removePrestation} = prestationSlice.actions;

export default prestationSlice.reducer;