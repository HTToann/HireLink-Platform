import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";

const tokenSlice = createSlice({
    name: "token",
    initialState: localStorage.getItem("token") || null,
    reducers: {
        setToken: (state, action) => {
            localStorage.setItem("token", action.payload);
            state = action.payload;
            return state;
        },
        removeToken: (state) => {
            localStorage.removeItem("token");
            state = null;
            return state;
        }
    }
})

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;