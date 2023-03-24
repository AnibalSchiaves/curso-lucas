import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken, getUserLogged } from "./reducers/authSlice";

const PrivateRoute = ({children}) => {
    const token = useSelector(getToken);
    //const userLogged  = useSelector(getUserLogged);

    if (token) {
        return children;
    } else {
        return <Navigate to="/login" replace />        
    }
}

export default PrivateRoute;