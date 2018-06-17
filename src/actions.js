import uuid from 'node-uuid';
import { UserId } from './db';

export const TaskStatus = {
    NEW: 0,
    COMPLETED: 100,
}

export const SyncStatus = {
    MODIFIED: 0,
    IN_SYNC: 1,
    SYNCED: 100,
}

export const ActionTypes = {
    EDIT_TASK: 'EDIT_TASK',
    UPDATE_EDITED_TASK: 'UPDATE_EDITED_TASK',
    DISMISS_EDIT: 'DISMISS_EDIT',

    SAVE_TASK: 'SAVE_TASK',
    TASK_SYNCED: 'TASK_SYNCED',

    LOAD_TASKS: 'LOAD_TASKS',
    TASKS_LOADED: 'TASKS_LOADED',

    SET_FILTER: 'SET_FILTER',
}

export function editNewTask() {
    return {
        type: ActionTypes.EDIT_TASK,
        task: {
            status: TaskStatus.NEW,
            task_id: uuid(),
            user_id: UserId()
        }
    };
}

export function editTask(task) {
    return { type: ActionTypes.EDIT_TASK, task };
}

export function updateEditedTask(props) {
    return { type: ActionTypes.UPDATE_EDITED_TASK, props };
}

export function saveTask(task) {
    return { type: ActionTypes.SAVE_TASK, task: { ...task, sync_state: SyncStatus.MODIFIED } };
}

export function loadTasks() {
    return { type: ActionTypes.LOAD_TASKS };
}

export function tasksLoaded(tasks) {
    return { type: ActionTypes.TASKS_LOADED, tasks };
}

export function dismissEdit() {
    return { type: ActionTypes.DISMISS_EDIT };
}

export function setFilter(filter) {
    return { type: ActionTypes.SET_FILTER, filter };
}
