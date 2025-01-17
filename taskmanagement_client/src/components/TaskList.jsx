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
  const [notification, setNotification] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const getToken = () => {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token);  // Debug log to check the token
    return token;
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await axios.get('http://127.0.0.1:8000/api/tasks', {
        headers: {
         'Content-Type' : 'application/json',
  'Accept' : 'application/json',
  'Authorization' : `Bearer ${token}`
        },
        withCredentials: true,
      });
      setTasks(response.data);
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
      const token = getToken();
      const response = await axios.post('http://127.0.0.1:8000/api/tasks', task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks([...tasks, response.data]);
      setNotification('Task added successfully!');
    } catch (err) {
      console.error('Failed to add task:', err);
      setError('Failed to add task. Please try again.');
    }
  };

  const updateTask = async (id, status) => {
    try {
      const token = getToken();
      const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setNotification('Task updated successfully!');
    } catch (err) {
      console.error('Failed to update task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (id) => {
    if (confirmDelete !== id) {
      setConfirmDelete(id);
      return;
    }

    try {
      const token = getToken();
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter(task => task.id !== id));
      setNotification('Task deleted successfully!');
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task. Please try again.');
    } finally {
      setConfirmDelete(null);
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
      {notification && (
        <div className={`${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'} border border-green-400 px-4 py-3 rounded relative`} role="alert">
          {notification}
        </div>
      )}

      {error && (
        <div className={`${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'} border border-red-400 px-4 py-3 rounded relative`} role="alert">
          {error}
        </div>
      )}

      {confirmDelete && (
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} border border-gray-300 p-4 rounded relative`}>
          <p>Are you sure you want to delete this task?</p>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => deleteTask(confirmDelete)}
              className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmDelete(null)}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              No
            </button>
          </div>
        </div>
      )}

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
