import React from 'react';

import TaskList from './TaskList';
import NewTask from './NewTask';


const App = () => (
    <div className="content">
        <NewTask />
        <TaskList />
    </div>
);

export default App;
