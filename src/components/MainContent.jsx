import React from 'react';
import TaskList from './TaskList';

const MainContent = () => {
  return (
    <main className="flex-1 p-10">
      <h1 className="text-3xl font-bold mb-6">Today</h1>
      <TaskList />
    </main>
  );
};

export default MainContent;