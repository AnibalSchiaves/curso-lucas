import React, { useMemo, useState } from "react";
import AuthContext from "./authcontext";

export default function AuthProvider(props) {

    const [user, setUser] = useState(null);
    //const value = useMemo(() => [user, setUser], [user]);
    const value = [user, setUser];
    return <AuthContext.Provider value={value} {...props} />

}