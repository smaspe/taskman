import React from 'react';
import { connect } from 'react-redux';
import { saveTask, setEditTask } from '../actions';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core';

import DatePicker from 'material-ui-pickers/DatePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { insert } from '../tools/orderIndex';
import { taskSort } from '../db';

const EditTask = ({ task, order, update, save, cancel }) => {
    if (!task) {
        return null;
    }
    return (
        <div>
            <Dialog open={true}
                onClose={cancel}>
                <DialogTitle>{task.order ? "Edit Task" : "New Task"}</DialogTitle>
                <DialogContent>
                    Snoozed until:

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker value={task.snoozeUntil ? task.snoozeUntil : null} invalidLabel="Not snoozed" disablePast={true}
                            onChange={date => update({ ...task, snoozeUntil: date })} />
                    </MuiPickersUtilsProvider>
                    <TextField
                        label="Title"
                        autoFocus
                        fullWidth
                        onChange={e => update({ ...task, title: e.target.value })}
                        defaultValue={task.title}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel}>Cancel</Button>
                    <Button onClick={e => save({ ...task, order })} disabled={!task.title}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const firstOrder = function (tasks) {
    const taskList = [...Object.values(tasks)];
    taskList.sort(taskSort);
    return taskList.length > 0 ? taskList[0].order : null;
}


const mapStateToProps = state => {
    const order = (state.edit && state.edit.order) || insert(null, firstOrder(state.tasks));
    return {
        task: state.edit,
        order
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update: task => dispatch(setEditTask(task)),
        save: task => {
            dispatch(saveTask(task));
            dispatch(setEditTask(null));
        },
        cancel: () => dispatch(setEditTask(null))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
