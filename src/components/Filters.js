import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../actions';

import { List, ListItem, ListItemText, ListItemSecondaryAction, ListSubheader, Switch } from '@material-ui/core';

const Filters = ({ filter, setFilterCompleted, setFilterSnoozed }) =>

    <List subheader={<ListSubheader>Filters</ListSubheader>}>
        <ListItem>
            <ListItemText primary="Show Completed" />
            <ListItemSecondaryAction>
                <Switch checked={filter.completed} onChange={e => setFilterCompleted(e.target.checked)} />
            </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
            <ListItemText primary="Show Snoozed" />
            <ListItemSecondaryAction>
                <Switch checked={filter.snoozed} onChange={e => setFilterSnoozed(e.target.checked)} />
            </ListItemSecondaryAction>
        </ListItem>
    </List>


const mapStateToProps = state => {
    return { filter: state.filter }
};

const mapDispatchToProps = dispatch => {
    return {
        setFilterCompleted: completed => dispatch(setFilter({ completed })),
        setFilterSnoozed: snoozed => dispatch(setFilter({ snoozed }))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filters);

