import { useTaskContext } from "../context/TaskContext";

const TaskList = () => {
    const {tasks, clearTasks} = useTaskContext();

    return(
        <div>
            <div>
                <button onClick={clearTasks}>
                    Clear All Tasks
                </button>
            </div>

            {tasks.length === 0 && <h1> No Tasks Added Yet</h1>}
            {tasks.map(task => (
               <h1> {task.id} </h1>
            ))}
        </div>
    );
}

export default TaskList;