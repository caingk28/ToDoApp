import React from 'react';

const FilterOptions = ({ categories, categoryFilter, statusFilter, onCategoryFilterChange, onStatusFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
      <div className="flex-1">
        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default FilterOptions;