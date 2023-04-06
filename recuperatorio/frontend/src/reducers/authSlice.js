import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { saveToken, getToken as getPersistedToken, saveUser, getUser as getPersistedUser, deleteUserAndToken } from "../utils/token";

const URL_API = process.env.REACT_APP_URL_API;
const PATH_LOGIN = process.env.REACT_APP_PATH_LOGIN;
const PERSIST_TOKEN = (process.env.REACT_APP_PERSIST_TOKEN === 'true');

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

const getPersistedTokenAndInit = () => {
    const token = getPersistedToken();
    console.log(token);
    if (token) {
        console.log('entro aca');
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
        return token;
    } else {
        return null;
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: PERSIST_TOKEN?getPersistedTokenAndInit():null,
        user: PERSIST_TOKEN?getPersistedUser():null
    },
    reducers: {
        logout: (state, action) => {
            state.token = null;
            state.user = null;
            axios.defaults.headers.common['authorization'] = '';
            if (PERSIST_TOKEN) {
                deleteUserAndToken();
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user  = action.payload.usuario;
                axios.defaults.headers.common['authorization'] = `Bearer ${state.token}`;
                if (PERSIST_TOKEN) {
                    saveToken(state.token);
                    saveUser(state.user);
                }
            })
    }
});

export default authSlice.reducer;

export const {logout} = authSlice.actions;

export const getToken = (state) => state.auth?.token;

export const getUserLogged = (state) => state.auth?.user;