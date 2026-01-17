import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import EditTaskModal from "./EditTaskModal";

const TaskItem = ({ task }) => {
    const { toggleTask, deleteTask } = useTaskContext();
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    

    const handleReadMore = () => {
        setShowModal(true);
    }

    const DeleteConirmation = ({onConfirm, onCancel}) => {
        return(
            <div className="modal-overlay">
                <div className="modal">
                    <h3>Confirm Delete </h3>
                    <p> Are you sure you want to delete this task ?</p>
                    <div className="modal-actions">
                    <button onClick={onConfirm} style={{ background: "#c62828"}}> Delete </button>
                    <button onClick={onCancel}>Cancel</button>
                    </div>

                </div>
            </div>
        );
    };

    return (
        <>
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

               <div
                        className="task-details"
                        style={{ flex: 1 }}
                    >
                        <h3>{task.title}</h3>

                        {task.description && (
                        <p className="task-desc">
                                
                        {task.description.length > 100
                        ? `${task.description.slice(0,200)}...`
                         : task.description}
                         
                         
                         {task.description.length > 100 && (
                            <span
                            onClick={handleReadMore}
                            style={{color: "blue", cursor: "pointer"}}
                            > Read More

                            </span>
                         )
                         }</p>
                        )}


                            <span className={`priority-chip ${task.priority}`}>
                                {task.priority.toUpperCase()}
                            </span>
                    </div>

           
            <div className="task-actions">

                <button disabled={task.completed}
                    onClick={handleReadMore}>Edit</button>

                <button onClick={() => setShowDelete(true)}>Delete</button>

                {showDelete && (
                    <DeleteConirmation
                    onConfirm={() => {deleteTask(task.id); setShowDelete(false)}}
                    onCancel={() => setShowDelete(false)} />
                )}    

                
            </div>
        </div>
        </div>

        {showModal && (
            <EditTaskModal task={task} onClose={() => setShowModal(false)}/>
        )}
        </>
    );
};

export default TaskItem;
