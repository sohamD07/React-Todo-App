import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "../features/todo/todoSlice";

import { loadTodos, saveTodos } from "../helpers/localStorage";

const store = configureStore({
  reducer: todoReducer,
  preloadedState: {
    todos: loadTodos(),
  },
});

// Debounce localStorage saves
let saveTimeout;
store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveTodos(store.getState().todos);
  }, 500); // Save after 500ms of inactivity
});

export default store;
