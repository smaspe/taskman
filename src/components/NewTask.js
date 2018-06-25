import React from 'react';
import { connect } from 'react-redux';

import { insert } from '../tools/orderIndex';
import { taskSort } from '../db';
import { saveTask, setNewTitle } from '../actions';

const NewTask = ({ order, title, task, update, save }) => (
    <div className="row shadow" style={{ marginBottom: '48px' }}>
        <input type="text" className="task_title" placeholder="Add a new Task" value={title} onChange={update}/>
        <i className="add_task task_action fas fa-plus" onClick={e => save({ title, order })}></i>
    </div>
);

const firstOrder = function (tasks) {
    const taskList = [...Object.values(tasks)];
    taskList.sort(taskSort);
    return taskList.length > 0 ? taskList[0].order : null;
}


const mapStateToProps = state => {
    return {
        order: insert(null, firstOrder(state.tasks)),
        title: state.new_title
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update: e => dispatch(setNewTitle(e.target.value)),
        save: props => {
            dispatch(saveTask(props));
            dispatch(setNewTitle(''));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);
