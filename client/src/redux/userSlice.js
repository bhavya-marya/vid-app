import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.loading = true;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        follow: (state, action) => {
            if (state.currentUser.following.includes(action.payload)) {
                state.currentUser.following.splice(state.currentUser.following.findIndex(channelId => channelId === action.payload), 1);
            } else {
                state.currentUser.following.push(action.payload);
            }
        },
        save: (state, action) => {
            if (state.currentUser.saved.includes(action.payload)) {
                state.currentUser.saved.splice(state.currentUser.saved.findIndex(channelId => channelId === action.payload), 1);
            } else {
                state.currentUser.saved.push(action.payload);
            }
        },
        profileImg: (state, action) => {
            state.currentUser.img = action.payload;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, follow, save, profileImg } = userSlice.actions;
export default userSlice.reducer;