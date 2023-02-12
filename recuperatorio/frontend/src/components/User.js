import React from "react";

export default function({user, onDelete, onEdit}) {
    return <tr key={user._id}>
        <td>{user.nombre}</td>
        <td>{user.apellido}</td>
        <td>{user.dni}</td>
        <td>{user.fechaNacimiento}</td>
        <td>
            <button type="button" onClick={onDelete}>Eliminar</button>
            <button type="button" onClick={onEdit}>Modificar</button>
        </td>
    </tr>
}