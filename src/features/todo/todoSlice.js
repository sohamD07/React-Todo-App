import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const text = action.payload?.trim();
            if (!text) return;
            const todo = {
                id: nanoid(),
                text: action.payload,
                completed: false,
                createdAt: new Date().getTime()
            }
            state.todos.unshift(todo);
        },
        editTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo && text?.trim()) {
                todo.text = text.trim();
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id != action.payload);
        },
        updateTodoStatus: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    },
});

export const { addTodo, editTodo, deleteTodo, updateTodoStatus } = todoSlice.actions;

export default todoSlice.reducer;