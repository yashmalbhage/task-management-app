import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuthenticated, darkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(' http://127.0.0.1:8000/api/login', {
        username,
        password
      }, {
        withCredentials: true // Important for sending cookies with the request
      });
      if (response.status === 200) {
        setAuthenticated(true);
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-dark-100' : 'bg-gray-100'}`}>
      <form
        onSubmit={handleLogin}
        className={`bg-white p-6 rounded shadow-md ${darkMode ? 'bg-dark-200' : 'bg-white'}`}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-600'}`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
