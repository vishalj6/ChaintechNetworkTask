import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: JSON.parse(localStorage.getItem('token')) || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', JSON.stringify(state.token));
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
