import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import Task from './Task';
import { TASK_STATUS, setTaskStatus, moveByIndices, editTask } from '../actions';
import moment from 'moment';

const TaskList = SortableContainer(({ taskList, setTaskStatus, editTask }) => {
    const tasks = taskList.map((task, index) =>
        <Task task={task}
            setTaskStatus={status => setTaskStatus(task.id)(status)}
            editTask={() => editTask(task)}
            key={task.id} index={index} />
    );
    return (
        <List style={{ padding: 0 }}>{tasks}</List>

    );
});

const mapStateToProps = state => {
    return {
        taskList: state.taskList.filter(task => {
            if (!state.filter.completed) {
                if (task.status === TASK_STATUS.COMPLETED) {
                    return false;
                }
            }
            if (!state.filter.snoozed) {
                if (task.snoozeUntil && task.snoozeUntil.isAfter(moment())) {
                    return false;
                }
            }
            return true;
        }),
        // Used by SortableContainer
        useDragHandle: true
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setTaskStatus: id => status => dispatch(setTaskStatus(id, status)),
        editTask: task => dispatch(editTask(task)),
        // Called by SortableContainer directly
        onSortEnd: ({ oldIndex, newIndex }) => dispatch(moveByIndices(oldIndex, newIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
