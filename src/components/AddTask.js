import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions';
import Button from 'material-ui/Button/Button';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';

const AddTask = ({ classes, dispatch }) => {
    return (
            <Button fab className={classes.button} color="primary" onClick={e => dispatch(addTask())}>
                <AddIcon />
            </Button>
    );
};

const styles = theme => ({
    button: {
        position: 'absolute',
        right: 3 * theme.spacing.unit,
        bottom: 3 * theme.spacing.unit,
        left: 'auto'
    }
});

export default connect()(withStyles(styles)(AddTask));
