export const TASK_STATUS = {
    NEW: 0,
    COMPLETED: 100,
}

export const SYNC_STATUS = {
    MODIFIED: 0,
    IN_SYNC: 1,
    SYNCED: 100,
}

export const EDIT_NEW_TASK = 'EDIT_NEW_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const UPDATE_EDITED_TASK = 'UPDATE_EDITED_TASK';
export const DISMISS_EDIT = 'DISMISS_EDIT';

export const SET_TASK_STATUS = 'SET_TASK_STATUS';
export const SAVE_TASK = 'SAVE_TASK';
export const MOVE_BY_INDICES = 'MOVE_BY_INDICES';
export const TASK_SYNCED = 'TASK_SYNCED';

export const LOAD_TASKS = 'LOAD_TASKS';
export const TASKS_LOADED = 'TASKS_LOADED';

export const SET_FILTER = 'SET_FILTER';

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

export function loadTasks() {
    return { type: LOAD_TASKS };
}

export function tasksLoaded(tasks) {
    return { type: TASKS_LOADED, tasks };
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