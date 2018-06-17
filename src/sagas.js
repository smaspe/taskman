import { cps, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { Api } from './db'
import { ActionTypes, tasksLoaded } from './actions';

function* syncTask(action) {
    try {
        console.log(action);
        const tasks = yield select(store => store.taskList);
        // TODO find a way not to have to look into the store. Make sure the task in the action is self-contained
        const task = tasks.find(t => t.task_id === action.task.task_id);
        const result = yield cps(Api.syncTask, task);
        console.log('sync task result ' + result.toString());
        // TODO mark task as synced?
    } catch (e) {
        console.log("Error", e);
    }
}

export function* syncTaskSaga() {
    yield takeEvery(ActionTypes.SAVE_TASK, syncTask);
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
    yield takeLatest(ActionTypes.LOAD_TASKS, loadTasks);
}
