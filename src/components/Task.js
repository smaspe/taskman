import React from 'react';

import Checkbox from 'material-ui/Checkbox';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { TASK_STATUS } from '../actions';
import ReorderIcon from 'material-ui-icons/Reorder';
import { ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon } from 'material-ui/List';
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
            <Checkbox checked={task.status === TASK_STATUS.COMPLETED} onChange={e => {
                if (e.target.checked) {
                    setTaskStatus(TASK_STATUS.COMPLETED);
                } else {
                    setTaskStatus(TASK_STATUS.NEW);
                }
            }} />
        </ListItemSecondaryAction>
    </ListItem>
);

export default Task;
