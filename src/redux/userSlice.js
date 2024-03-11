import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    userName: "",
 }

 export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { userName } = action.payload;
            state.userName = userName;
            localStorage.setItem('user', userName)
        },
        deleteUser: () => {
            localStorage.removeItem('user')
        }
    }
 })

 export const { addUser, deleteUser } = userSlice.actions;
 export default userSlice.reducer;