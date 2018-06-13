import React from 'react';
import { connect } from 'react-redux';
import { editNewTask } from '../actions';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const EditNewTaskButton = ({ classes, dispatch }) => {
    return (
            <Button variant='fab' className={classes.button} color="primary" onClick={e => dispatch(editNewTask())}>
                <AddIcon />
            </Button>
    );
};

const styles = theme => ({
    button: {
        position: 'sticky',
        flexShrink: 0,
        bottom: 2 * theme.spacing.unit,
        right: 0,
        margin: 2 * theme.spacing.unit,
        marginLeft: 'auto'
    }
});

export default connect()(withStyles(styles)(EditNewTaskButton));
