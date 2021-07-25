import { createSlice } from "@reduxjs/toolkit";


// THIS SLICE IS USED TO DISPLAY THE USER INFO 
// PATH IS /USERS/ANY-THING


const initialState = {
    photo: '',
    name: '',
    coverPhoto: '',
    date: Date.now(),
    role: '',
    email: '',
    location: {
        coordinates: [],
        city: "",
        locality: ""
    },
    averageRating: 1,
    ratingCount: 2,
    description: "GoodMan",
    id: ""
}

const user = createSlice({
    name: "current-user",
    initialState: initialState,
    reducers: {
        // ADDING USER 
        setUser (state, action) {
            console.log(action.payload)
            return state = {
                photo: action.payload.photo || "",
                name: action.payload.name || "",
                 coverPhoto: action.payload.coverPhoto ? action.payload.coverPhoto : '' ,
                 date: action.payload.date || "",
                 role: action.payload.role || "",
                 email: action.payload.email || "",
                 location: { ...action.payload.location || ''
                        },
                 averageRating: action.payload.averageRating || "",
                 ratingCount: action.payload.ratingCount || "",
                 description: action.payload.description || "",
                 id: action.payload.id || "",
                 books: action.payload.books,
                 reviews: action.payload.reviews,
                 comments: action.payload.comments
                }
            }
        }
    
})

export default user.reducer;
export const userAction = user.actions;