import React from 'react';

import { TaskStatus } from '../actions';

import { SortableElement, SortableHandle } from 'react-sortable-hoc';

import ReorderIcon from '@material-ui/icons/Reorder';

import { Checkbox, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon } from '@material-ui/core';

import moment from 'moment';

const DragHandle = SortableHandle(() => <ListItemIcon><ReorderIcon /></ListItemIcon>);

const Task = SortableElement(({ task, setTaskStatus, editTask }) =>
    <ListItem button onClick={editTask}>
        <DragHandle />
        <ListItemText
            primary={task.title}
            secondary={
                task.snoozeUntil && task.snoozeUntil.isAfter(moment())
                    ? ("Snoozed for about " + task.snoozeUntil.toNow(true))
                    : ""
            } />
        <ListItemSecondaryAction>
            <Checkbox checked={task.status === TaskStatus.COMPLETED} onChange={e => {
                if (e.target.checked) {
                    setTaskStatus(TaskStatus.COMPLETED);
                } else {
                    setTaskStatus(TaskStatus.NEW);
                }
            }} />
        </ListItemSecondaryAction>
    </ListItem>
);

export default Task;
