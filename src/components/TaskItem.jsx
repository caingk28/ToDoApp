import React from 'react';

const TaskItem = ({ task, onDelete, onEdit, onToggleCompletion }) => {
  const priorityColors = {
    low: 'bg-green-200',
    medium: 'bg-yellow-200',
    high: 'bg-red-200'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompletion(task.id)}
            className="mr-2 h-5 w-5"
          />
          <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.name}
          </span>
        </div>
        <div className="flex flex-wrap items-center mt-2 sm:mt-0">
          {task.category && (
            <span className="mr-2 mb-2 sm:mb-0 px-2 py-1 bg-gray-200 text-sm rounded">
              {task.category}
            </span>
          )}
          {task.dueDate && (
            <span className="mr-2 mb-2 sm:mb-0 text-sm text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
          <span className={`mr-2 mb-2 sm:mb-0 px-2 py-1 text-sm rounded ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button 
          onClick={() => onEdit(task)} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task.id)} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;