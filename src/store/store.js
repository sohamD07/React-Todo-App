import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "../features/todo/todoSlice";

import { loadTodos, saveTodos } from "../helpers/localStorage";

const store = configureStore({
    reducer: todoReducer,
    preloadedState: {
        todos: loadTodos(),
    },
});

store.subscribe(() => {
  saveTodos(store.getState().todos);
});

export default store;
