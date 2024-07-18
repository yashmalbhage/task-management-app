import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskForm = ({ onAddTask, darkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <motion.form
    onSubmit={handleSubmit}
    className={`${darkMode ? 'bg-dark-200' : 'bg-white'} shadow-md rounded px-8 pt-6 pb-8 mb-4`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="mb-4">
      <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="title">
        Title
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 ${darkMode ? 'bg-dark-100 text-gray-300' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>
    <div className="mb-6">
      <label className={`block ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="description">
        Description
      </label>
      <textarea
        className={`shadow appearance-none border rounded w-full py-2 px-3 ${darkMode ? 'bg-dark-100 text-gray-300' : 'text-gray-700'} mb-3 leading-tight focus:outline-none focus:shadow-outline`}
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>
    <div className="flex items-center justify-between">
      <motion.button
        className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Task
      </motion.button>
    </div>
  </motion.form>
  );
};

export default TaskForm;