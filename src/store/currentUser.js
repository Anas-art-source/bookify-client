import { createSlice} from "@reduxjs/toolkit";

// THIS SLICE IS USED TO SET THE CURRENT USER
// IT ALSO HANDLE LOGIN LOGOUT FUNCTIONALITY

const initialState = {
    currentUserId: '',
    login: false
}

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: initialState,
    reducers: {
        login (state, action) {
            return state = {
                userId: action.payload.currentUserId,
                login: true
            }
        },
        logout (state, action) {
            return state = {
                userId: "",
                login: false
            }
        }
    }
})  


export default currentUserSlice.reducer;

export const currentUserAction = currentUserSlice.actions;