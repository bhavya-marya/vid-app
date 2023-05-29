import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentVideo: null,
    loading: false,
    error: false,
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchFailure: (state) => {
            state.loading = true;
            state.error = true;
        },
        like: (state, action) => {
            if (!state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes.push(action.payload);
            } else {
                state.currentVideo.likes.splice(
                    state.currentVideo.likes.findIndex(
                        userId => userId === action.payload
                    ), 1
                );
            }
        }
    },
});

export const { fetchStart, fetchSuccess, fetchFailure, like } = videoSlice.actions;
export default videoSlice.reducer;