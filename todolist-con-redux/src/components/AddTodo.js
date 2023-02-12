import React from "react";
import { useState } from "react";
import { addTodo } from "../reducers/todolistSlice";
import {useDispatch} from 'react-redux';

export default function() {
    const [texto, setTexto] = useState("");
    const dispatch = useDispatch();

    const handleTexto = function(e) {
        setTexto(e.target.value);
    }

    const handleClick = function() {
        dispatch(addTodo(texto));
        setTexto("");
    }

    return (
        <div>
            <textarea cols="80" rows="2" value={texto} onChange={handleTexto}></textarea>
            <br></br>
            <button type="button" onClick={handleClick}>Agregar</button>
        </div>
    )
}