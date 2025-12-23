import { memo } from "react";
import { FaRegCircle } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { timeAgo } from "../helpers/time";
import DeleteIcon from "./DeleteIcon";
import PencilIcon from "./PencilIcon";

const TodoItem = memo(({ todo, onEdit, onDelete, onToggleStatus }) => {
    return (
        <div
            className={`relative group flex w-full rounded border-gray-200 border shadow py-4 px-6 justify-center items-center ${todo.completed ? "bg-gray-100" : ""
                }`}
        >
            <button
                onClick={() => onToggleStatus(todo.id)}
                aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
                {!todo.completed ? (
                    <FaRegCircle />
                ) : (
                    <TiTick className="h-6 w-6" color="green" />
                )}
            </button>

            <div className="flex-4 flex-col break-all items-start px-6">
                <div className={`text-md ${todo.completed ? "line-through" : ""}`}>
                    {todo.text}
                </div>
                <p className="text-xs text-gray-500">{timeAgo(todo.createdAt)}</p>
            </div>

            <div className="flex-1 sm:hidden group-hover:flex gap-2">
                <button
                    onClick={() => onEdit(todo)}
                    aria-label="Edit task"
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                    <PencilIcon />
                </button>
                <button
                    onClick={() => onDelete(todo.id)}
                    aria-label="Delete task"
                    className="focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
});

TodoItem.displayName = 'TodoItem';

export default TodoItem;