import { ActionTypes, SyncStatus, TaskStatus } from "./actions";
import uuid from 'node-uuid';
import { insert } from "./tools/orderIndex";
import AWS from 'aws-sdk';


export function taskList(state = [], action) {
    switch (action.type) {
        case ActionTypes.SET_TASK_STATUS:
            return state.map(task => (task.task_id === action.task_id)
                ? { ...task, status: action.status }
                : task);
        case ActionTypes.SAVE_TASK:
            const updatedTask = { ...action.task, sync_state: SyncStatus.MODIFIED };
            if (!state.find(task => task.task_id === updatedTask.task_id)) {
                updatedTask.order = insert(null, state.length > 0 ? state[0].order : null);
                return [
                    updatedTask,
                    ...state
                ];
            }
            return state.map(task => (task.task_id === updatedTask.task_id)
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
        // TODO move the id outside of the reducer
            return { status: TaskStatus.NEW, task_id: uuid(), user_id: AWS.config.credentials.identityId };
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