import {configureStore} from '@reduxjs/toolkit';
import todolistReducer from './reducers/todolistSlice';

export default configureStore({
    reducer: {
        todolist: todolistReducer
    }
});