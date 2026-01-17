import { useState, useEffect, useRef } from "react";
import { useTaskContext } from "../context/TaskContext";
import EditTaskModal from "./EditTaskModal";

const TaskItem = ({ task }) => {
    const { toggleTask, deleteTask } = useTaskContext();
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false)
    const [expanded, setExpanded] = useState(false);
    const descRef = useRef(null);

    useEffect(() => {
        const el = descRef.current;
        if (!el) return;

        requestAnimationFrame(() => {
            setShowReadMore(el.scrollHeight > el.clientHeight);
        });
    }, [task.description]);

    const handleEdit = () => {
        setShowModal(true);
    }

    const DeleteConirmation = ({ onConfirm, onCancel }) => {
        return (
            <div className="modal-overlay">
                <div className="modal">
                    <h3>Confirm Delete </h3>
                    <p> Are you sure you want to delete this task ?</p>
                    <div className="modal-actions">
                        <button onClick={onConfirm} style={{ background: "#c62828" }}> Delete </button>
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

                    <div className="task-details">
                        <p
                            ref={descRef}
                            className={`task-desc ${expanded ? "expanded" : ""}`}
                        >
                            {task.description}

                            {!expanded && showReadMore && (
                                <span
                                    className="read-more-inline"
                                    onClick={() => setExpanded(true)}
                                >
                                    Read more
                                </span>
                            )}

                            {expanded && (
                                <span
                                    className="read-less-inline"
                                    onClick={() => setExpanded(false)}
                                >
                                    Read less
                                </span>
                            )}
                        </p>


                        <div>
                            <span className={`priority-chip ${task.priority}`}>
                                {task.priority.toUpperCase()}
                            </span>
                        </div>
                    </div>


                    <div className="task-actions">

                        <button disabled={task.completed}
                            onClick={handleEdit}>Edit</button>

                        <button onClick={() => setShowDelete(true)}>Delete</button>

                        {showDelete && (
                            <DeleteConirmation
                                onConfirm={() => { deleteTask(task.id); setShowDelete(false) }}
                                onCancel={() => setShowDelete(false)} />
                        )}


                    </div>
                </div>
            </div>

            {showModal && (
                <EditTaskModal task={task} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};

export default TaskItem;
