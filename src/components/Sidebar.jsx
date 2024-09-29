import React, { useState } from 'react';

const Sidebar = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="fixed top-4 left-4 z-20 sm:hidden bg-blue-500 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0 transition duration-200 ease-in-out bg-gray-800 text-white w-64 p-6 flex flex-col z-10`}>
        <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
        <button 
          onClick={onAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add New Task
        </button>
        <li><button className="w-full text-left py-2 px-4 rounded hover:bg-gray-100">Inbox</button></li>
        <li><button className="w-full text-left py-2 px-4 rounded hover:bg-gray-100">Today</button></li>
        <li><button className="w-full text-left py-2 px-4 rounded hover:bg-gray-100">Upcoming</button></li>
      </div>
    </>
  );
};

export default Sidebar;