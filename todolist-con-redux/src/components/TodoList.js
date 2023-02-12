import React from "react";
import Todo from "./Todo";
import { useSelector, useDispatch } from 'react-redux';
import { todoCompleted } from "../reducers/todolistSlice";

export default function TodoList() {
    const todos = useSelector((state) => {
        const todoList = state.todolist.allIds.map(id => {
            return {...state.todolist.todosById[id], id};
        });
        return todoList;
    });
    const dispatch = useDispatch();
    const handleClick = function(id) {
        dispatch(todoCompleted(id));
    }
    return (<div>
                <h2>Lista para hacer</h2>
                <ul>
                    {todos.map((t) => <Todo text={t.text} completed={t.completed} id={t.id} key={t.id} handleClick={() => handleClick(t.id)}></Todo>)}
                </ul>
            </div>);

}