import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    loadState: false,
 }

 export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoader: (state, action) => {
            const { loaderState } = action.payload;
            state.loadState = loaderState;
        }
    }
 })

 export const { setLoader } = loaderSlice.actions;
 export default loaderSlice.reducer;