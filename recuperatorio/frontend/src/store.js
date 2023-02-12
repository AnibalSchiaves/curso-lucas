import {configureStore} from '@reduxjs/toolkit';
import usersSlice from './reducers/usersSlice';


export default configureStore({
    reducer: {
        users: usersSlice
    }
})