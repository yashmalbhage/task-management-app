import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = ({ darkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://taskmanagementb.vercel.app/api/alltasks');
      setTasks(response.data);
      console.log('Fetched tasks:', response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('https://taskmanagementb.vercel.app/api/Createtasks', task);
      setTasks([...tasks, response.data]);
    } catch (err) {
      console.error('Failed to add task:', err);
      setError('Failed to add task. Please try again.');
    }
  };

  const updateTask = async (id, status) => {
    try {
      const response = await axios.put(`https://taskmanagementb.vercel.app/api/updatetasks/${id}`, { status });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
    } catch (err) {
      console.error('Failed to update task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://taskmanagementb.vercel.app/api/Deletetask/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (loading) return <div className="text-center mt-5">Loading tasks...</div>;

  return (
    <div className="space-y-6">
      {error && <div className={`${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'} border border-red-400 px-4 py-3 rounded relative`} role="alert">{error}</div>}

      
      <div className="mb-4">
        
        <select
          value={filter}
          onChange={handleFilterChange}
          className={`p-2 border rounded ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
        >
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <TaskForm onAddTask={addTask} darkMode={darkMode} />
        </div>
        <div className="md:col-span-2">
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <TaskItem
                  task={task}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                  darkMode={darkMode}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
 
  );
};

export default TaskList;
