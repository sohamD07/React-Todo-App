import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "./components/EmptyState";
import NotePadIcon from "./components/NotePadIcon";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { addTodo, deleteTodo, editTodo, updateTodoStatus } from "./features/todo/todoSlice";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [inputText, setInputText] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEditTodo, setSelectedEditTodo] = useState(null);

  const completedTodos = useMemo(() =>
    todos.filter((todo) => todo.completed).length,
    [todos]
  );

  const handleEdit = useCallback((todo) => {
    setEditOpen(true);
    setInputText(todo.text);
    setSelectedEditTodo(todo);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (inputText.trim().length === 0) return;

    if (editOpen) {
      dispatch(editTodo({ id: selectedEditTodo.id, text: inputText }));
      setEditOpen(false);
      setSelectedEditTodo(null);
    } else {
      dispatch(addTodo(inputText));
    }
    setInputText('');
  }, [inputText, editOpen, selectedEditTodo, dispatch]);

  const handleToggleStatus = useCallback((id) => {
    dispatch(updateTodoStatus(id));
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteTodo(id));
  }, [dispatch]);

  console.log("rendering");



  return (
    <div className="bg-[#F9FFFB] min-h-screen flex flex-col justify-start items-center">
      <div className="flex flex-col justify-center items-center sm:w-1/2 w-full sm:px-0 px-4 sm:mt-25 mt-15 space-y-4">
        <NotePadIcon />
        <h1 className="text-3xl font-bold">My Tasks </h1>
        <p className="text-[#38362E]">Stay organized, get things done</p>
        <TodoForm
          inputText={inputText}
          setInputText={setInputText}
          onSubmit={onSubmit}
        />
        <div className="sm:h-4 h-10 " aria-hidden="true"></div>
        {
          todos && todos.length == 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="w-full flex justify-between px-2">
                <div className="text-md">
                  {todos && todos.length} task
                </div>
                {
                  completedTodos > 0 && (<div className="text-md font-medium text-green-700">
                    {completedTodos} completed
                  </div>)
                }
              </div>
              {
                todos && todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                  />
                ))
              }
                <div className="h-4" aria-hidden="true"></div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default App
