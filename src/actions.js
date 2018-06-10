export const TASK_STATUS = {
    NEW: 0,
    COMPLETED: 100,
}

export const EDIT_NEW_TASK = 'EDIT_NEW_TASK';

export const SET_TASK_STATUS = 'SET_TASK_STATUS';

export const EDIT_TASK = 'EDIT_TASK';
export const UPDATE_EDITED_TASK = 'UPDATE_EDITED_TASK';
export const SAVE_TASK = 'SAVE_TASK';
export const DISMISS_EDIT = 'DISMISS_EDIT';

export const SET_FILTER = 'SET_FILTER';

export const MOVE_BY_INDICES = 'MOVE_BY_INDICES';


export function editNewTask() {
    return { type: EDIT_NEW_TASK };
}

export function setTaskStatus(id, status) {
    return { type: SET_TASK_STATUS, id, status };
}

export function editTask(task) {
    return { type: EDIT_TASK, task };
}

export function updateEditedTask(props) {
    return { type: UPDATE_EDITED_TASK, props };
}
export function saveTask(task) {
    return { type: SAVE_TASK, task };
}
export function dismissEdit() {
    return { type: DISMISS_EDIT };
}

export function setFilter(filter) {
    return { type: SET_FILTER, filter };
}

export function moveByIndices(from, to) {
    return { type: MOVE_BY_INDICES, from, to };
}