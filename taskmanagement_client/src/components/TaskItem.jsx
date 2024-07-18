import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, TrashIcon  } from '@heroicons/react/solid';

const TaskItem = ({ task, onUpdateTask, onDeleteTask, darkMode }) => {
  return (
    <motion.div
      className={`${darkMode ? 'bg-dark-200' : 'bg-white'} shadow-md rounded px-8 pt-6 pb-8 mb-4`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{task.title}</h3>
      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{task.description}</p>
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded text-sm ${
          task.status === 'todo' ? 'bg-yellow-200 text-yellow-800' :
          task.status === 'in_progress' ? 'bg-blue-200 text-blue-800' :
          'bg-green-200 text-green-800'
        }`}>
          {task.status}
        </span>
        <div className="space-x-2">
          <motion.button
            className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`}
            onClick={() => onUpdateTask(task.id, task.status === 'todo' ? 'in_progress' : 'done')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <CheckCircleIcon className="h-6 w-6" />
          </motion.button>
          <motion.button
            className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
            onClick={() => onDeleteTask(task.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <TrashIcon className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;