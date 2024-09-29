import React from 'react';

const SortOptions = ({ sortMethod, onSortChange }) => {
  return (
    <div className="mt-4">
      <label htmlFor="sort-method" className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
      <select
        id="sort-method"
        value={sortMethod}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="name">Name</option>
        <option value="category">Category</option>
        <option value="status">Status</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default SortOptions;