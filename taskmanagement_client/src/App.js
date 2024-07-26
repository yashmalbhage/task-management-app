import React, { useState } from 'react';
import TaskList from './components/TaskList';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-dark-100' : 'bg-gray-100'}`}>
      <header className={`${darkMode ? 'bg-dark-200' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Task Manager</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-dark-300 text-yellow-300' : 'bg-gray-200 text-gray-800'}`}
          >
            {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {authenticated ? (
            <TaskList darkMode={darkMode} />
          ) : (
            showRegister ? (
              <Register setAuthenticated={setAuthenticated} darkMode={darkMode} />
            ) : (
              <Login setAuthenticated={setAuthenticated} darkMode={darkMode} />
            )
          )}
          {!authenticated && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowRegister(!showRegister)}
                className={`text-blue-500 underline ${darkMode ? 'hover:text-blue-300' : 'hover:text-blue-700'}`}
              >
                {showRegister ? 'Back to Login' : 'Register'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
