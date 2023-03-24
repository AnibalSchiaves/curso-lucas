import {configureStore} from '@reduxjs/toolkit';
import usersSlice from './reducers/usersSlice';
import authSlice from './reducers/authSlice';


export default configureStore({
    reducer: {
        users: usersSlice,
        auth: authSlice
    }
})