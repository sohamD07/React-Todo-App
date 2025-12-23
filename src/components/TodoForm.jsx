
export default function TodoForm({inputText,setInputText,onSubmit}) {
    return (
        <form className="w-full flex sm:flex-row flex-col items-center gap-6 h-12" onSubmit={onSubmit}>
            <input className="w-full border border-gray-300 px-4 py-2 rounded shadow bg-white" type="text" placeholder="What needs to be done?" value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <div className={`px-4 py-2 rounded ${inputText.length > 0 ? "bg-blue-800" : "bg-blue-400"} text-white w-40 flex items-center justify-center shadow`}>
                <button>+ Add Task</button>
            </div>
        </form>
    )
}
