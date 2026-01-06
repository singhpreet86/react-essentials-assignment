import { useState } from "react"

const TaskForm = () => {

    const [FormData, SetFormData] = useState({
        title: "",
        description: "",
        priority: "medium",
        completed: false
    })

    const handleSubmit = (e) => {
        alert("form submit");
    }

    const handleChange = (e) => {
        alert("item changed");
    }

    return (
        <div>
            <form onClick={handleSubmit}>
                <h2> Add Task </h2>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={FormData.title}
                    onChange={handleChange}
                    placeholder="Task title....."
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    value={FormData.description}
                    onChange={handleChange}
                    placeholder="Task description......"
                    rows="3"
                />

                <label>Priority</label>
                <select
                    name="priority"
                    value={FormData.priority}
                    onChange={handleChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button type="submit" disabled={!FormData.title.trim()}>
                    Add Task
                </button>    

            </form>
        </div>
    )

}

export default TaskForm;