import { createContext, useContext, useReducer } from "react";

export const initialState = {
    tasks: [
        {
            id: 1,
            title: "Learning React",
            description: "Learning context, usereducer",
            completed: false,
            priority: "high"
        },
        {
            id: 2,
            title: "Learning Python",
            description: "Learning API in python",
            completed: false,
            priority: "high"
        }
    ]

};

export const ACTIONS = {
    ADD_TASK: "ADD_TASK",
    CLEAR_TASKS: "CLEAR_TASKS",
    DELETE_TASK: "DELETE_TASK",
    TOGGLE_TASK: "TOGGLE_TASK",
    EDIT_TASK: "EDIT_TASK"
};

export const TaskReducer = (state, action) => {

    switch (action.type) {

        case ACTIONS.ADD_TASK:

            const newTask = {
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false,
                priority: action.payload.priority || "medium"
            }

            return {
                ...state,
                tasks: [...state.tasks, newTask]
            };

        case ACTIONS.CLEAR_TASKS:
            return {
                ...state,
                tasks: []
            };

        case ACTIONS.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };

        case ACTIONS.TOGGLE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload ? { ...task, completed: !task.completed } : task)
            };

        case ACTIONS.EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? { ...task, ...action.payload.updates } : task)
            };

        default:
            throw new Error("Unhandle Exception");
    }

};


const TaskContext = createContext();

export const useTaskContext = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("Error......");
    }
    return context;
};

export const TaskProvider = ({ children }) => {

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const addTask = (taskData) => {
        dispatch({
            type: ACTIONS.ADD_TASK,
            payload: taskData
        });
    };

    const clearTasks = () => {
        dispatch({
            type: ACTIONS.CLEAR_TASKS
        });
    };

    const deleteTask = (id) => {
        dispatch({
            type: ACTIONS.DELETE_TASK,
            payload: id
        });
    };

    const toggleTask = (id) => {
        dispatch({
            type: ACTIONS.TOGGLE_TASK,
            payload: id
        });
    };

    const editTask = (id, updates) => {
        dispatch({
            type: ACTIONS.EDIT_TASK,
            payload: { id, updates }
        });
    };

    const value = {
        tasks: state.tasks,
        addTask,
        clearTasks,
        deleteTask,
        toggleTask,
        editTask
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;



