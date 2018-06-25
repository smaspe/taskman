import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import Task from './Task';
import { setEditTask, saveTask, TaskStatus } from '../actions';
import moment from 'moment';
import { insert } from '../tools/orderIndex';
import { taskSort } from '../db';
import TaskListHeader from './TaskListHeader';
import EditTask from './EditTask';

const TaskList = SortableContainer(({ taskList, edit, setTaskStatus, editTask }) => {
    const tasks = taskList.map((task, index) => {
        if (edit && edit.task_id === task.task_id) {
            return <EditTask task={edit} key={edit.task_id} index={index}/>;
        }
        return <Task task={task}
            setTaskStatus={status => setTaskStatus(task, status)}
            editTask={() => editTask(task)}
            key={task.task_id} index={index} />
    });
    return (
        <div className="task_list">
            <TaskListHeader />
            {tasks}
        </div>

    );
});

const mapStateToProps = state => {
    return {
        taskList: Object.values(state.tasks).filter(task => {
            if (!state.filter.completed) {
                if (task.status === TaskStatus.COMPLETED) {
                    return false;
                }
            }
            if (!state.filter.snoozed) {
                if (task.snoozeUntil && task.snoozeUntil.isAfter(moment())) {
                    return false;
                }
            }
            return true;
        }).sort(taskSort),
        edit: state.edit,
        // Used by SortableContainer
        useDragHandle: false,
        pressDelay: 200
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // TODO move those 2 to Task directly
        setTaskStatus: (task, status) => dispatch(saveTask({ ...task, status })),
        editTask: task => dispatch(setEditTask(task)),
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
        // TODO find the indices without actually performing the move, that's expensive for no reason
        const newList = arrayMove(stateProps.taskList, oldIndex, newIndex);
        const before = (newIndex > 0) ? newList[newIndex - 1].order : null;
        const after = (newIndex < (newList.length - 1)) ? newList[newIndex + 1].order : null;
        newList[newIndex].order = insert(before, after);

        dispatchProps.saveTask(newList[newIndex]);
    },
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskList);
