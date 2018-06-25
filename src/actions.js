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
    SET_EDIT_TASK: 'SET_EDIT_TASK',

    SET_NEW_TITLE: 'SET_NEW_TITLE',

    SAVE_TASK: 'SAVE_TASK',
    TASK_SYNCED: 'TASK_SYNCED',

    LOAD_TASKS: 'LOAD_TASKS',
    TASKS_LOADED: 'TASKS_LOADED',

    SET_FILTER: 'SET_FILTER',
}

export function setNewTitle(title) {
    return { type: ActionTypes.SET_NEW_TITLE, title};
}

export function setEditTask(task) {
    return { type: ActionTypes.SET_EDIT_TASK, task };
}

export function saveTask(task) {
    if (!task.task_id) {
        task = {
            ...task,
            status: TaskStatus.NEW,
            task_id: uuid(),
            user_id: UserId()
        }
    }
    // TODO emit the sync task modifed update as a separate action from the saga
    return { type: ActionTypes.SAVE_TASK, task: { ...task, sync_state: SyncStatus.MODIFIED } };
}

export function loadTasks() {
    return { type: ActionTypes.LOAD_TASKS };
}

export function tasksLoaded(tasks) {
    return { type: ActionTypes.TASKS_LOADED, tasks };
}

export function setFilter(filter) {
    return { type: ActionTypes.SET_FILTER, filter };
}
