import { EDIT_NEW_TASK, SET_TASK_STATUS, TASK_STATUS, SET_FILTER, MOVE_BY_INDICES, EDIT_TASK, DISMISS_EDIT, SAVE_TASK, UPDATE_EDITED_TASK } from "./actions";
import { arrayMove } from "react-sortable-hoc/dist/commonjs/utils";

export function taskList(state = [], action) {
    switch (action.type) {
        case SET_TASK_STATUS:
            return state.map(task => (task.id === action.id)
                ? { ...task, status: action.status }
                : task);
        case SAVE_TASK:
            const updatedTask = action.task;
            if (!updatedTask.id) {
                const newTask = { ...action.task, id: state.length + 1 };
                return [
                    newTask,
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
        case EDIT_NEW_TASK:
            return { status: TASK_STATUS.NEW };
        case EDIT_TASK:
            return action.task;
        case UPDATE_EDITED_TASK:
            return { ...state, ...action.props };
        case DISMISS_EDIT:
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