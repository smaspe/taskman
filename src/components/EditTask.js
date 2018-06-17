import React from 'react';
import { connect } from 'react-redux';
import { dismissEdit, saveTask, updateEditedTask } from '../actions';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button} from '@material-ui/core';

import DatePicker from 'material-ui-pickers/DatePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

const EditTask = ({ task, update, save, cancel }) => {
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
                        <DatePicker value={task.snoozeUntil ? task.snoozeUntil : null} invalidLabel="Not snoozed" disablePast={true} onChange={date => update({ snoozeUntil: date })} />
                    </MuiPickersUtilsProvider>
                    <TextField
                        label="Title"
                        autoFocus
                        fullWidth
                        onChange={e => update({ title: e.target.value })}
                        defaultValue={task.title}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancel}>Cancel</Button>
                    <Button onClick={e => save(task)} disabled={!task.title}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        task: state.edit
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update: props => dispatch(updateEditedTask(props)),
        save: task => {
            dispatch(saveTask(task));
            dispatch(dismissEdit());
        },
        cancel: () => dispatch(dismissEdit())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
