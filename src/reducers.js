import { ActionTypes, SyncStatus, TaskStatus } from "./actions";
import uuid from 'node-uuid';
import { insert } from "./tools/orderIndex";


export function taskList(state = [], action) {
    switch (action.type) {
        case ActionTypes.SET_TASK_STATUS:
            return state.map(task => (task.id === action.id)
                ? { ...task, status: action.status }
                : task);
        case ActionTypes.SAVE_TASK:
            const updatedTask = { ...action.task, sync_state: SyncStatus.MODIFIED };
            if (!state.find(task => task.id === updatedTask.id)) {
                updatedTask.order = insert(null, state.length > 0 ? state[0].order : null);
                return [
                    updatedTask,
                    ...state
                ];
            }
            return state.map(task => (task.id === updatedTask.id)
                ? updatedTask
                : task);
        case ActionTypes.TASKS_LOADED:
            return action.tasks;
        default:
            return state;
    }
}

export function edit(state = null, action) {
    switch (action.type) {
        case ActionTypes.EDIT_NEW_TASK:
            return { status: TaskStatus.NEW, id: uuid() };
        case ActionTypes.EDIT_TASK:
            return action.task;
        case ActionTypes.UPDATE_EDITED_TASK:
            return { ...state, ...action.props };
        case ActionTypes.DISMISS_EDIT:
            return null;
        default:
            return state;
    }
}

export function filter(state = {}, action) {
    switch (action.type) {
        case ActionTypes.SET_FILTER:
            return { ...state, ...action.filter };
        default:
            return state;
    }
}