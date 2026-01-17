import { useState } from  "react";
import { useTaskContext } from "../context/TaskContext";

const EditTaskModal = ({task, onClose}) => {
    const {editTask} = useTaskContext();

    const [editData, setEditData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority

    });

     const saveEdit = (e) => {
        e.preventDefault();
        editTask(task.id, editData);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
            <h2> Edit Task </h2>

            <form onSubmit={saveEdit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleChange}
                    placeholder="Task title....."
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    placeholder="Task description......"
                    rows="3"
                    required
                />

                <label>Priority</label>
                <select
                    name="priority"
                    value={editData.priority}
                    onChange={handleChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <div className="modal-actions">
                <button type="submit" disabled={!editData.title.trim() || !editData.description.trim()  }>
                    Update Task
                </button>

                <button type="button" onClick={onClose}>Cancel</button>
                </div>

            </form>
        </div>
        </div>
    )

};


export default EditTaskModal;