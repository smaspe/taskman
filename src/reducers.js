import { EDIT_NEW_TASK, SET_TASK_STATUS, TASK_STATUS, SET_FILTER, EDIT_TASK, DISMISS_EDIT, SAVE_TASK, UPDATE_EDITED_TASK, SYNC_STATUS, TASKS_LOADED } from "./actions";
import uuid from 'node-uuid';
import { insert } from "./tools/orderIndex";


export function taskList(state = [], action) {
    switch (action.type) {
        case SET_TASK_STATUS:
            return state.map(task => (task.id === action.id)
                ? { ...task, status: action.status }
                : task);
        case SAVE_TASK:
            const updatedTask = { ...action.task, sync_state: SYNC_STATUS.MODIFIED };
            if (!state.find(task => task.id === updatedTask.id)) {
                updatedTask.order = insert(null, state.length > 0 ? state[0].order : null);
                return [
                    updatedTask,
                    ...state
                ];
            }
            const newState = state.map(task => (task.id === updatedTask.id)
                ? updatedTask
                : task);

            newState.sort((a, b) => {
                if (a.order > b.order) {
                    return 1;
                }
                if (a.order < b.order) {
                    return -1;
                }
                return 0;
            });
            return newState;
        case TASKS_LOADED:
            return action.tasks;
        default:
            return state;
    }
}

export function edit(state = null, action) {
    switch (action.type) {
        case EDIT_NEW_TASK:
            return { status: TASK_STATUS.NEW, id: uuid() };
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