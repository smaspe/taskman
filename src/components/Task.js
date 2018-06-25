import React from 'react';

import { TaskStatus } from '../actions';

import { SortableElement } from 'react-sortable-hoc';

import moment from 'moment';


const Task = SortableElement(({ task, setTaskStatus, editTask }) => {
    const isCompleted = task.status === TaskStatus.COMPLETED;
    const snooze = task.snoozeUntil && task.snoozeUntil.isAfter(moment()) ?
        <span className="edited">
            - Snoozed for about {task.snoozeUntil.toNow(true)}
        </span>
        : null;
    return (
        <div className="task_item row shadow" onClick={editTask}>
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
