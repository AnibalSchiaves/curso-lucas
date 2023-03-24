import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const URL_API = process.env.REACT_APP_URL_API;
const PATH_USERS = process.env.REACT_APP_PATH_USERS;

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (payload, {getState}) => {
        //const response = await axios.get("http://localhost:3001/users")
        const state = getState(); /*solo lo agrego para mostrar como acceder al state desde thunk */
        let config = {
            headers: {
                authorization: `Bearer ${state.auth.token}`
            }
        }
        const response = await axios.get(URL_API + PATH_USERS, config);
        //const response = await axios.get(URL_API + PATH_USERS);
        return response.data;
    }
);

export const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async (id) => {
        //const response = await axios.get("http://localhost:3001/users/"+id)
        const response = await axios.get(URL_API + PATH_USERS + id)
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUsers",
    async (id) => {
        //const response = await axios.delete("http://localhost:3001/users/"+id)
        const response = await axios.delete(URL_API + PATH_USERS + id)
        return response.data;
    }
);

export const saveUser = createAsyncThunk(
    "users/saveUsers",
    async ({id, user}) => {
        //let url = "http://localhost:3001/users/";
        let url = URL_API + PATH_USERS;
        let response;
        try {
            if (id) {
                url += id;
                response = await axios.patch(url, user);
            } else {
                response = await axios.post(url, user);
            }
            return {
                error:false,
                _id:id,
                data: response.data
            }
        } catch(error) {
            const msg = error.code==='ERR_BAD_REQUEST'?error.response.data:'Ha ocurrido un error inesperado al guardar el usuario';
            return {
                error:true,
                data: msg
            }
        }
    }
);

const usersSlice = createSlice(
    {
        name:"users",
        initialState: {
            data: [],
            status: 'idle',
            error: null
        },
        reducers: {
        },
        extraReducers(builder) {
            builder
                .addCase(fetchUsers.pending, (state, action) => {
                    state.status = "loading";
                })
                .addCase(fetchUsers.fulfilled, (state, action) => {
                    state.status = "completed";
                    state.data = state.data.concat(action.payload);
                })
                .addCase(fetchUsers.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                })
                .addCase(deleteUser.fulfilled, (state, action) => {
                    state.data = state.data.filter(u => u._id !== action.payload._id)
                })
                .addCase(saveUser.pending, (state, action) => {
                    state.error = null;
                })
                .addCase(saveUser.fulfilled, (state, action) => {
                    if (action.payload.error) {
                        state.error = action.payload.data;
                    } else {
                        if (action.payload._id) {
                            state.data = state.data.map(d => d._id===action.payload._id?action.payload.data:d);
                        } else {
                            state.data = state.data.concat(action.payload.data);
                        }
                    }
                })
                .addCase(saveUser.rejected, (state, action) => {
                    state.error = action.error.message;
                })
        }
    }
);

export default usersSlice.reducer;

export const getUsers = state => state.users.data;



