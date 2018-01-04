import React from 'react';
import { connect } from 'react-redux';
import { cancelEdit, saveTask, updateTask } from '../actions';
import Dialog from 'material-ui/Dialog/Dialog';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogActions from 'material-ui/Dialog/DialogActions';
import TextField from 'material-ui/TextField/TextField';
import Button from 'material-ui/Button/Button';
import { DatePicker } from 'material-ui-pickers'

const EditTask = ({ task, update, save, cancel }) => {
    if (!task) {
        return null;
    }
    return (
        <div>
            <Dialog open={true}
                onClose={cancel}>
                <DialogTitle>{task.id ? "Edit Task" : "New Task"}</DialogTitle>
                <DialogContent>
                    Snoozed until:
                    <DatePicker value={task.snoozeUntil ? task.snoozeUntil : null} invalidLabel="Not snoozed" disablePast={true} onChange={date => update({ snoozeUntil: date })} />
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
        update: props => dispatch(updateTask(props)),
        save: task => {
            dispatch(saveTask(task));
            dispatch(cancelEdit())
        },
        cancel: () => dispatch(cancelEdit())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
