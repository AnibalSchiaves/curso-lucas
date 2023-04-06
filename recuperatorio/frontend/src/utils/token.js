export const saveToken = (token) => {
    if (localStorage) {
        localStorage.setItem("authToken", token);
    } else {
        //Salvar por medio de cookie u otro método
    }
}

export const getToken = () => {
    if (localStorage) {
        return localStorage.getItem("authToken");
    } else {
        //recuperar por medio de cookie u otro método
    }
}

export const saveUser = (user) => {
    if (localStorage) {
        localStorage.setItem("authUser", JSON.stringify(user));
    } else {
        //Salvar por medio de cookie u otro método
    }
}

export const getUser = () => {
    if (localStorage) {
        const userStr = localStorage.getItem("authUser");
        return (userStr?JSON.parse(userStr):null);
    } else {
        //recuperar por medio de cookie u otro método
    }
}

export const deleteUserAndToken = () => {
    if (localStorage) {
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
    } else {
        //Salvar por medio de cookie u otro método
    }
}