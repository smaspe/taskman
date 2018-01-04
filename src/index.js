import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import moment from 'moment';
import * as reducers from './reducers';

let state = JSON.parse(localStorage.getItem('state'),
    (key, value) => (key === 'snoozeUntil' && value) ? moment(value, moment.ISO8601, true) : value)
    || { taskList: [], filter: 'all' };

let store = createStore(combineReducers(reducers), state);

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
