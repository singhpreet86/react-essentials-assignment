import { useState } from "react"
import { useTaskContext } from "../context/TaskContext"


const TaskForm = () => {

    const {addTask} = useTaskContext();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium",
        completed: false
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(formData);
    }

    const handleChange = (e) => {   
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2> Add Task </h2>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Task title....."
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Task description......"
                    rows="3"
                />

                <label>Priority</label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button type="submit" disabled={!formData.title.trim()}>
                    Add Task
                </button>    

            </form>
        </div>
    )

}

export default TaskForm;