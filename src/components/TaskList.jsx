import React, { useState } from 'react';
import TaskItem from './TaskItem';
import SortOptions from './SortOptions';
import FilterOptions from './FilterOptions';

const TaskList = ({ tasks, setTasks, onEditTask, sortMethod, onSortChange, categories, categoryFilter, statusFilter, onCategoryFilterChange, onStatusFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    return (categoryFilter === 'all' || task.category === categoryFilter) &&
           (statusFilter === 'all' || 
            (statusFilter === 'completed' && task.completed) ||
            (statusFilter === 'active' && !task.completed)) &&
           task.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Tasks</h2>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded mt-2"
        />
        <FilterOptions 
          categories={categories}
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          onCategoryFilterChange={onCategoryFilterChange}
          onStatusFilterChange={onStatusFilterChange}
        />
        <SortOptions sortMethod={sortMethod} onSortChange={onSortChange} />
      </div>
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <TaskItem 
              task={task} 
              onDelete={deleteTask} 
              onEdit={onEditTask}
              onToggleCompletion={toggleTaskCompletion}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;