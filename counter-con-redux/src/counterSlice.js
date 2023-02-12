import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value:0
    },
    reducers: {
        decrement: (state) => {
            state.value -= 1;
        },
        increment: (state) => {
            state.value += 1;
        },
        incrementByAmount: (state, action) => {
            state.value += parseInt(action.payload);
        }
    }
});

export const {decrement, increment, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;