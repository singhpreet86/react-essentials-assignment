import { type } from "@testing-library/user-event/dist/type";
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
    CLEAR_TASK: "CLEAR_TASKS"

};

export const TaskReducer = (state, action ) => {

    switch(action.type){

        case ACTIONS.ADD_TASK:

            const newTask = {
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false,
                priority: action.payload.priority || "medium"
            }

            return{
                ...state,
                tasks: [...state.tasks, newTask]
            }

        case ACTIONS.CLEAR_TASKS:
            return {
                ...state,
                tasks:[]
            }

        default:
            throw new Error("Unhandle Exception");            
    }

};


const TaskContext = createContext();

export const useTaskContext = () => {
    const context = useContext(TaskContext);

    if(!context){
        throw new Error("Error......");
    }
    return context;
};

export const TaskProvider = ({children}) => {

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
    }

    const value = {
        tasks: state.tasks,
        addTask,
        clearTasks
    };

    return(
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;



