import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [categories, setCategories] = useState(['Work', 'Personal', 'Shopping', 'Other']);
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [sortMethod, setSortMethod] = useState('name');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    setEditingTask(null);
    setNewTaskName('');
    setNewTaskCategory('');
    setNewTaskDueDate('');
    setNewTaskPriority('medium');
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTaskName(task.name);
    setNewTaskCategory(task.category);
    setNewTaskDueDate(task.dueDate || '');
    setNewTaskPriority(task.priority || 'medium');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskName.trim() !== '') {
      if (editingTask) {
        setTasks(tasks.map(task => 
          task.id === editingTask.id ? { ...task, name: newTaskName, category: newTaskCategory, dueDate: newTaskDueDate, priority: newTaskPriority } : task
        ));
      } else {
        const newTask = {
          id: Date.now().toString(),
          name: newTaskName,
          category: newTaskCategory,
          completed: false,
          dueDate: newTaskDueDate,
          priority: newTaskPriority
        };
        setTasks([...tasks, newTask]);
      }
      setNewTaskName('');
      setNewTaskCategory('');
      setNewTaskDueDate('');
      setNewTaskPriority('medium');
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const sortTasks = (tasksToSort) => {
    return tasksToSort.sort((a, b) => {
      switch (sortMethod) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        case 'status':
          return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = { low: 0, medium: 1, high: 2 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      <Sidebar onAddTask={handleAddTask} />
      <TaskList 
        tasks={sortTasks([...tasks])} 
        setTasks={setTasks} 
        onEditTask={handleEditTask}
        sortMethod={sortMethod}
        onSortChange={setSortMethod}
        categories={categories}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        onCategoryFilterChange={setCategoryFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        title={editingTask ? "Edit Task" : "Add New Task"}
      >
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter task name"
          className="w-full px-3 py-2 border rounded mt-2"
        />
        <select
          value={newTaskCategory}
          onChange={(e) => setNewTaskCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded mt-2"
        >
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="w-full px-3 py-2 border rounded mt-2"
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
          className="w-full px-3 py-2 border rounded mt-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </Modal>
    </div>
  );
}

export default App;