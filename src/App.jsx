import { MdStickyNote2 } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import DeleteIcon from "./components/DeleteIcon";
import NotePadIcon from "./components/NotePadIcon";
import PencilIcon from "./components/PencilIcon";


import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo, updateTodoStatus } from "./features/todo/todoSlice";

import { timeAgo } from "./helpers/time";



function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const [inputText, setInputText] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEditTodo, setSelectedEditTodo] = useState(null);

  const completedTodos = todos && todos.filter((todo) => todo.completed).length;

  const handleEdit = (todo) => {
    setEditOpen(true);
    setInputText(todo.text);
    setSelectedEditTodo(todo)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(inputText.length == 0)return;
    if (editOpen) {
      dispatch(editTodo({ id: selectedEditTodo.id, text: inputText }))
      setEditOpen(false);
    } else {
      dispatch(addTodo(inputText));
    }
    setInputText('');
  }


  return (
    <div className="bg-[#F9FFFB] min-h-screen flex flex-col justify-start items-center">
      <div className="flex flex-col justify-center items-center sm:w-1/2 w-full sm:px-0 px-4 sm:mt-25 mt-15 space-y-4">
        <NotePadIcon />
        <h1 className="text-3xl font-bold">My Tasks </h1>
        <p className="text-[#38362E]">Stay organized, get things done</p>
        <form className="w-full flex sm:flex-row flex-col items-center gap-6 h-12" onSubmit={onSubmit}>
          <input className="w-full border border-gray-300 px-4 py-2 rounded shadow bg-white" type="text" placeholder="What needs to be done?" value={inputText} onChange={(e) => setInputText(e.target.value)} />
          <div className={`px-4 py-2 rounded ${inputText.length > 0 ? "bg-blue-800" : "bg-blue-400"} text-white w-40 flex items-center justify-center shadow`}>
            <button>+ Add Task</button>
          </div>
        </form>
        <div className="sm:h-4 h-10"></div>
        {
          todos && todos.length == 0 ? (
            <div className="flex flex-col items-center mt-20">
              <MdStickyNote2 className="h-16 w-16" color="#e5e7eb" />
              <h1 className="text-lg font-medium">No tasks yet</h1>
              <h2 className="text-sm">Add your first task to get started</h2>
            </div>
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
                  <div key={todo.id} className={`relative group flex w-full rounded border-gray-200 border shadow py-4 px-6 justify-center items-center ${todo.completed ? "bg-gray-100" : ""}`}>
                    {
                      !todo.completed ? (
                        <div onClick={() => dispatch(updateTodoStatus(todo.id))}><FaRegCircle /></div>
                      ) : (
                      <div onClick={() => dispatch(updateTodoStatus(todo.id))}>
                        <TiTick className="h-6 w-6" color="green" />
                      </div>
                    )
                    }
                    <div className="flex-4 flex-col break-all items-start px-6">
                      <div className={`text-md ${todo.completed ? "line-through" : ""}`}>{todo.text}</div>
                      <p className="text-xs">{timeAgo(todo.createdAt)}</p>
                    </div>
                    <div className="flex-1 sm:hidden group-hover:block">
                      <div className="flex justify-around">
                        <div onClick={() => handleEdit(todo)}>
                          <PencilIcon />
                        </div>
                        <div onClick={e => dispatch(deleteTodo(todo.id))}>
                          <DeleteIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
              <div className="h-4"></div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default App
