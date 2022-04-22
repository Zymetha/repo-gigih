import { createSlice } from "@reduxjs/toolkit";

export const userTokenSlice = createSlice({
    name:'userToken',
    initialState: {
        value: ''
    },
    devtools: true,
    reducers: {
        saveToken: (state, action) => {
            state.token += action.payload
        },
    },
})

export const { saveToken } = userTokenSlice.actions
export default userTokenSlice.reducer