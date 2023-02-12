import React from "react";

export default function({text, completed, id, handleClick}) {
    return <li id={id} key={id} onClick={handleClick}>
        {completed?<del>{text}</del>:text}
    </li>
} 