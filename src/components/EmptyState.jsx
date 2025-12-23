
import { MdStickyNote2 } from "react-icons/md";

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center mt-20">
            <MdStickyNote2 className="h-16 w-16" color="#e5e7eb" />
            <h1 className="text-lg font-medium">No tasks yet</h1>
            <h2 className="text-sm">Add your first task to get started</h2>
        </div>
    )
}
