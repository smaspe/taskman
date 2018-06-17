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

let state = JSON.parse(localStorage.getItem('state')) || { tasks: {}, filter: {} };

const sagaMiddleware = createSagaMiddleware();
let store = createStore(combineReducers(reducers), state, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(syncTaskSaga);
sagaMiddleware.run(loadTasksSaga);

store.subscribe(() => {
    const state = { ...store.getState() };
    // Don't store task list for now, rely solely on dynamo db
    // TODO Store locally at least un-synced tasks, and merge during loading
    delete state.tasks;
    localStorage.setItem('state', JSON.stringify(state));
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();

store.dispatch(loadTasks());
