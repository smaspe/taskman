import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import List from '@material-ui/core/List';
import Task from './Task';
import { TASK_STATUS, setTaskStatus, editTask, saveTask } from '../actions';
import moment from 'moment';
import { insert } from '../tools/orderIndex';

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

const byOrder = (a, b) => {
    if (a.order > b.order) {
        return 1;
    }
    if (a.order < b.order) {
        return -1;
    }
    return 0;
}

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
        }).sort(byOrder),
        // Used by SortableContainer
        useDragHandle: true
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTaskStatus: id => status => dispatch(setTaskStatus(id, status)),
        editTask: task => dispatch(editTask(task)),
        saveTask: bindActionCreators(saveTask, dispatch)
    }
}

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    // Called by SortableContainer directly
    onSortEnd: ({ oldIndex, newIndex }) => {
        if (oldIndex === newIndex) {
            return;
        }
        // Find the new index of the task, update the task, dispatch the save action
        const newList = arrayMove(stateProps.taskList, oldIndex, newIndex);
        const before = (newIndex > 0) ? newList[newIndex - 1].order : null;
        const after = (newIndex < (newList.length - 1)) ? newList[newIndex + 1].order : null;
        newList[newIndex].order = insert(before, after);

        dispatchProps.saveTask(newList[newIndex]);
    },
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskList);
