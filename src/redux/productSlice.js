import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

//Define the initial state for products
const initialState = {
    items: [],
    status: 'start',
    error: null
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://66a07c047053166bcabb90c1.mockapi.io/student');
    return response.data;
});

//Create the products slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productsSlice.reducers;