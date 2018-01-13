import React from 'react';

import TaskList from './TaskList';
import NewTask from './NewTask';

const Tasks = () => {
  return (
    <div className='container'>
      <NewTask />
      <TaskList />
    </div>
  );
};

export default Tasks;
