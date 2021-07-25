import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books : []
}

const Books = createSlice({
    name: "books",
    initialState: initialState,
    reducers: {
        book (state, action) {
            return state = {books: action.payload}
        }
    }
})

export default Books.reducer;
export const booksAction = Books.actions;