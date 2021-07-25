import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user'
import currentUserReducer from './currentUser';
import booksReducer from './book'
import userSearchReducer from './userSearch';

const store = configureStore({
    reducer: {user: userReducer, currentUser: currentUserReducer, book: booksReducer, userSearch: userSearchReducer}
})


export default store;