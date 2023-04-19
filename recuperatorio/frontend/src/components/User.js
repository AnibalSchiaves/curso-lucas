import React from "react";
import { formatHumanDate } from "../util";
import Button from "../controls/Button";

export default function({user, onDelete, onEdit}) {
    return <tr key={user._id}>
        <td>{user.nombre}</td>
        <td>{user.apellido}</td>
        <td>{user.dni}</td>
        <td>{formatHumanDate(user.fechaNacimiento)}</td>
        <td>
            <Button type="button" onClick={onDelete}>Eliminar</Button>
            <Button type="button" onClick={onEdit}>Modificar</Button>
        </td>
    </tr>
}