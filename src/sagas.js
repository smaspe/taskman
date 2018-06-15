import { cps, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { Api } from './db'
import { LOAD_TASKS, tasksLoaded, SAVE_TASK, MOVE_BY_INDICES, SET_TASK_STATUS } from './actions';

function* syncTask(action) {
    try {
        const tasks = yield select(store => store.taskList);
        const task = action.hasOwnProperty('to') ? tasks[action.to] : tasks.find(t => t.id === action.task.id);
        const result = yield cps(Api.syncTask, task);
        console.log('sync task result ' + result.toString());
        // TODO mark task as synced?
    } catch (e) {
        console.log("Error", e);
    }
}

export function* syncTaskSaga() {
    yield takeEvery([SAVE_TASK, MOVE_BY_INDICES, SET_TASK_STATUS], syncTask);
}

function* loadTasks(action) {
    try {
        const tasks = yield cps(Api.loadTasks);
        yield put(tasksLoaded(tasks));
    } catch (e) {
        console.log("Error", e);
    }
}

export function* loadTasksSaga() {
    yield takeLatest(LOAD_TASKS, loadTasks);
}
