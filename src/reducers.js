import { ActionTypes } from "./actions";

export function tasks(state = {}, action) {
    switch (action.type) {
        case ActionTypes.SAVE_TASK:
            return { ...state, [action.task.task_id]: action.task };
        case ActionTypes.TASKS_LOADED:
            return action.tasks;
        default:
            return state;
    }
}

export function edit(state = null, action) {
    switch (action.type) {
        case ActionTypes.SET_EDIT_TASK:
            return action.task;
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