import { createSlice } from "@reduxjs/toolkit";

const todolistSlice = createSlice({
    name: "todolist",
    initialState: {
        todosById: {
            /*"1":{
                text: "Ya hecha",
                completed: true
            },
            "2":{
                text: "Por hacer",
                completed: false
            }*/
        },
        /*allIds: [1,2],
        currentId:2*/
        allIds: [],
        currentId:0
    },
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                text: action.payload,
                completed: false
            }
            const id = state.currentId+1;
            state.todosById[id] = newTodo;
            state.allIds = [...state.allIds,id]
            state.currentId = id;
        },
        todoCompleted: (state, action) => {
            let todo = state.todosById[action.payload];
            todo.completed = !todo.completed;
            state.todosById[action.payload] = todo;
        }
    }
});

export const {addTodo, todoCompleted} = todolistSlice.actions;

export default todolistSlice.reducer;