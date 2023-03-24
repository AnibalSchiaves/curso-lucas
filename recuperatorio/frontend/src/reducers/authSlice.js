import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;
const PATH_LOGIN = process.env.REACT_APP_PATH_LOGIN;

export const login = createAsyncThunk(
    "auth/login",
    async ({usuario, contrasenia}) => {
        const url = URL_API + PATH_LOGIN;
        const credenciales = {
            email: usuario,
            contrasenia: contrasenia
        }
        try {
            const response = await axios.post(url, credenciales);
            return response.data;
        } catch(error) {
            console.error(error);
            return false;
        }
    }  
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: null
    },
    reducers: {
        logout: (state, action) => {
            state.token = null;
            state.user = null;
            axios.defaults.headers.common['authorization'] = '';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user  = action.payload.usuario;
                axios.defaults.headers.common['authorization'] = `Bearer ${state.token}`;
            })
    }
});

export default authSlice.reducer;

export const {logout} = authSlice.actions;

export const getToken = (state) => state.auth?.token;

export const getUserLogged = (state) => state.auth?.user;