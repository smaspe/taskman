import { cps, takeEvery, takeLatest, put } from 'redux-saga/effects'
import { Api } from './db'
import { SYNC_TASK, LOAD_TASKS, tasksLoaded } from './actions';

function* syncTask(action) {
    try {
        const result = yield cps(Api.syncTask, action.task);
        console.log('sync task result ' + result.toString());
        // TODO mark task as synced?
    } catch (e) {
        console.log("Error", e);
    }
}

export function* syncTaskSaga() {
    yield takeEvery(SYNC_TASK, syncTask);
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
