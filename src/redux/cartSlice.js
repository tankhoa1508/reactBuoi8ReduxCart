import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice ({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },

    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
        setLoading: (state) => {
            state.status = 'loading';
        },
        setError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        setLoaded: (state) => {
            state.status = 'succeeded';
        },
    }
})

export const { addItem, removeItem, clearCart, setLoading, setLoaded, setError } = cartSlice.actions;
export default cartSlice.reducer;