import React from 'react';
import 'react-day-picker/lib/style.css';

import { connect } from 'react-redux';
import { saveTask, setEditTask } from '../actions';

import { SortableElement } from 'react-sortable-hoc';
import DayPicker from 'react-day-picker'
import moment from 'moment';

const EditTask = SortableElement(({ order, update, save, cancel, task }) => {
    if (!task) {
        return null;
    }
    // TODO define a disabled style for the cancel and save buttons
    // TODO add a cancel button for the date picker
    const showDatePicker = () => {
        document.getElementById('date_picker').style.display = 'block';
    };
    const hideDatePicker = () => {
        document.getElementById('date_picker').style.display = 'none';
    };
    const snoozeDaySelected = day => {
        hideDatePicker();
        update({ ...task, snoozeUntil: moment(day) });
    };
    return (
        <div className="row separated shadow">
            <input type="text" className="task_title" value={task.title} onChange={e => update({ ...task, title: e.target.value })} autoFocus />
            <div style={{ position: 'relative' }}>
                <i className="snooze_task task_action fas fa-clock" onClick={showDatePicker}></i>
                <div id="date_picker" className="shadow date_picker">
                    <DayPicker onDayClick={snoozeDaySelected} selectedDays={task.snoozeUntil ? task.snoozeUntil.toDate() : null} />
                </div>
            </div>
            <i className="cancel_task task_action fas fa-undo" onClick={cancel}></i>
            <i className="save_task task_action fas fa-check" onClick={e => save(task)} disabled={!task.title} ></i>
        </div>
    );
});

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

export default connect(() => ({}), mapDispatchToProps)(EditTask);
