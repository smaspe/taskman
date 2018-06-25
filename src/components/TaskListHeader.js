import React from 'react';

import { connect } from 'react-redux';
import { setFilter } from '../actions';

const TaskListHeader = ({ filter, setFilterCompleted, setFilterSnoozed }) => (
    <div className="list_header row shadow">
        <div className="list_title">
            Task List
        </div>
        <i className="fas fa-filter list_filter" onClick={() => document.getElementById('menu').style.display = 'block'}></i>
        <div className="menu shadow" id="menu">
            <div className="menu_title_container">
                <div className="menu_title">
                    Filters
                </div>
                <i className="fas fa-filter menu_filter" onClick={() => document.getElementById('menu').style.display = 'none'}></i>
            </div>
            <div className="menu_row" onClick={e => setFilterCompleted(!filter.completed)}>
                <i className={"toggle fas" + (filter.completed ? " fa-toggle-on" : " fa-toggle-off")}></i>
                Show completed Tasks
            </div>
            <div className="menu_row" onClick={e => setFilterSnoozed(!filter.snoozed)}>
                <i className={"toggle fas" + (filter.snoozed ? " fa-toggle-on" : " fa-toggle-off")}></i>
                Show snoozed Tasks
            </div>
        </div>
    </div>
);


const mapStateToProps = state => {
    return { filter: state.filter }
};

const mapDispatchToProps = dispatch => {
    return {
        setFilterCompleted: completed => dispatch(setFilter({ completed })),
        setFilterSnoozed: snoozed => dispatch(setFilter({ snoozed }))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskListHeader);
