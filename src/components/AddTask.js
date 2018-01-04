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
        position: 'sticky',
        flexShrink: 0,
        bottom: 2 * theme.spacing.unit,
        right: 0,
        margin: 2 * theme.spacing.unit,
        marginLeft: 'auto'
    }
});

export default connect()(withStyles(styles)(AddTask));
