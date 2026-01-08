import { useTaskContext } from "../context/TaskContext";

const TaskSummary = () => {

    const { tasks } = useTaskContext();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <div className="task-summary">
            <p>Total Tasks: {totalTasks}</p>
            <p>Completed Tasks: {completedTasks}</p>
            <p>Pending Tasks: {pendingTasks}</p>
        </div>
    );
};

export default TaskSummary;
