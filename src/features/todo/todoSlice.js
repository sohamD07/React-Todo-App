import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos : []
}

export const todoSlice =  createSlice({
    name : "todos",
    initialState,
    reducers : {
        addTodo : (state, action)=>{
            const todo = {
                id : nanoid(),
                text : action.payload,
                completed : false,
                createdAt : new Date().getTime()
            }
            state.todos.push(todo);
        },
        editTodo : (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? {...todo, text : action.payload.text} : todo);
        },
        deleteTodo : (state,action) => {
            state.todos = state.todos.filter((todo) => todo.id != action.payload);
        },
        updateTodoStatus : (state,action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload ? {...todo, completed : !todo.completed} : todo);
        }
    },
});

export const {addTodo, editTodo, deleteTodo, updateTodoStatus} =  todoSlice.actions;

export default todoSlice.reducer;