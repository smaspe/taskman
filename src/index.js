import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';
import { syncTaskSaga, loadTasksSaga } from './sagas'
import { loadTasks } from './actions';
import moment from 'moment';

let state = JSON.parse(localStorage.getItem('state'),
    (k, v) => (v && k === 'snoozeUntil') ? moment(v, moment.ISO8601, true) : v)
    || { tasks: {}, filter: {} };

const sagaMiddleware = createSagaMiddleware();
let store = createStore(combineReducers(reducers), state, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(syncTaskSaga);
sagaMiddleware.run(loadTasksSaga);

store.subscribe(() => {
    // Don't store task list for now, rely solely on dynamo db
    // TODO Store locally at least un-synced tasks, and merge during loading
    const { tasks, ...state } = store.getState();
    localStorage.setItem('state', JSON.stringify(state));
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();

store.dispatch(loadTasks());
