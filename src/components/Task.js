import React from 'react';

import { TaskStatus } from '../actions';

import { SortableElement } from 'react-sortable-hoc';

import moment from 'moment';


const niceFormatter = function(now) {
    if (this.year() > now.year()) {
        return 'dddd MMM Do, YYYY';
    }
    if (this.month() > now.month()) {
        return 'dddd, MMMM Do';
    }
    return 'dddd Do';
}

const Task = SortableElement(({ task, setTaskStatus, editTask }) => {
    const isCompleted = task.status === TaskStatus.COMPLETED;
    const snooze = task.snoozeUntil && task.snoozeUntil.isAfter(moment()) ?
        <span className="edited">
            &nbsp;&mdash; Snoozed until {task.snoozeUntil.calendar(null, { sameElse: niceFormatter }).split(' at')[0]}
        </span>
        : null;
    return (
        <div className="task_item row" onClick={editTask}>
            <span className={"task_title" + (isCompleted ? ' done' : '')}>
                {task.title}
                {!isCompleted ? snooze : null}
            </span>
            <i className={isCompleted ? 'far fa-check-square' : 'far fa-square'}
                onClick={e => {
                    e.stopPropagation();
                    if (isCompleted) {
                        setTaskStatus(TaskStatus.NEW);
                    } else {
                        setTaskStatus(TaskStatus.COMPLETED);
                    }
                }}>
            </i>
        </div>
    )
});

export default Task;
