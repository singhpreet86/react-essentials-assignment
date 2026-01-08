import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
    const { editTask, toggleTask, deleteTask } = useTaskContext();
    const [isEditing, setIsEditing] = useState(false);

    const [editData, setEditData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority

    });

    const saveEdit = () => {
        editTask(task.id, editData);
        setIsEditing(false);
    };

    return (
        <div className={`task-item ${task.completed ? "completed" : ""}`}>
            <div className="task-item-content">
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() =>
                        toggleTask(task.id)
                    }
                />

                {isEditing ? (
                    <div className="task-editing">
                        <input value={editData.title} onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))} placeholder="Task title ..." />

                        <textarea value={editData.description} onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))} rows="5" placeholder="Task description ..." />


                        <select
                            value={editData.priority}
                            onChange={(e) =>
                                setEditData(prev => ({ ...prev, priority: e.target.value }))
                            }
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <button onClick={saveEdit} disabled={!editData.title.trim()}>Save</button>
                    </div>
                ) : (
                    <div
                        className="task-details"
                        style={{ textDecoration: task.completed ? "line-through" : "none" }}
                    >
                        <h3>{task.title}</h3>

                        {task.description && (
                            <p className="task-desc">{task.description}</p>
                        )}

                        <div className="task-meta">
                            <span className={`priority ${task.priority}`}>
                                {task.priority.toUpperCase()}
                            </span>
                        </div>
                    </div>

                )}
            </div>


            <div className="task-actions">

                <button disabled={task.completed}
                    onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit"}</button>

                <button disabled={task.completed || isEditing}
                    onClick={() =>
                        deleteTask(task.id)
                    }
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
