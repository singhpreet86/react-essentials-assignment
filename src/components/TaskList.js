import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const { tasks, clearTasks } = useTaskContext();

    return (
        <div>
            {tasks.length === 0 ?
                <h1> No Tasks Added Yet</h1> :
                <div className="task-actions" style={{ marginBottom: "1rem" }}>
                    <button onClick={clearTasks} >
                        Clear All Tasks
                    </button>
                </div>
            }
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}

export default TaskList;
