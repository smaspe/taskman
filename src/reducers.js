import { ADD_TASK, SET_TASK_STATUS, TASK_STATUS, SET_FILTER, MOVE_BY_INDICES, EDIT_TASK, CANCEL_EDIT, SAVE_TASK, UPDATE_TASK } from "./actions";
import { arrayMove } from "react-sortable-hoc/dist/commonjs/utils";

export function taskList(state = [], action) {
    switch (action.type) {
        case SET_TASK_STATUS:
            return state.map(task => (task.id === action.id)
                ? { ...task, status: action.status }
                : task);
        case SAVE_TASK:
            let updatedTask = action.task;
            if (!updatedTask.id) {
                updatedTask = { ...action.task, id: state.length + 1 };
                return [
                    updatedTask,
                    ...state
                ];
            }
            return state.map(task => (task.id === updatedTask.id)
                ? updatedTask
                : task);
        case MOVE_BY_INDICES:
            return arrayMove(state, action.from, action.to);
        default:
            return state;
    }
}

export function edit(state = null, action) {
    switch (action.type) {
        case ADD_TASK:
            return { status: TASK_STATUS.NEW };
        case EDIT_TASK:
            return action.task;
        case UPDATE_TASK:
            return { ...state, ...action.props };
        case CANCEL_EDIT:
            return null;
        default:
            return state;
    }
}

export function filter(state = {}, action) {
    switch (action.type) {
        case SET_FILTER:
            return { ...state, ...action.filter };
        default:
            return state;
    }
}