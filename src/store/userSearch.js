import { createSlice } from "@reduxjs/toolkit";


const userSearch = createSlice({
    name: "userSearch",
    initialState: {userSearch: []},
    reducers: {
        user (state, action) {
            return state = {userSearch: action.payload}
        }
    }
})


export default userSearch.reducer;
export const userSearchAction = userSearch.actions;