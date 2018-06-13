import React from 'react';
import TaskList from './TaskList';
import Filters from './Filters';
import EditTask from './EditTask';
import EditNewTaskButton from './EditNewTaskButton';

import { AppBar, Paper, Toolbar, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';



const styles = theme => ({
    paper: {
        margin: theme.spacing.unit
    }
});

const App = ({ classes }) => (
    <div className="top" >
        <AppBar position="static">
            <Toolbar>
                <Typography type="title" color="inherit">
                    Welcome to TaskMan
                </Typography>
            </Toolbar>
        </AppBar>
        <div className="main" >
            <div className="menu">
                <Paper className={classes.paper}>
                    <Filters />
                </Paper>
            </div>
            <div className="content">
                <Paper className={classes.paper + " innerContent"}>
                    <Typography type="headline" color="inherit" className={classes.paper}>
                        Your Tasks
                    </Typography>
                    <TaskList />
                    <EditNewTaskButton />
                </Paper>
            </div>
        </div>
        <EditTask />
    </div>
);

export default withStyles(styles)(App);
