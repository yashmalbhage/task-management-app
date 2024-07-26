import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setAuthenticated, darkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post(' http://127.0.0.1:8000/api/register', {
        username,
        password
      });
      if (response.status === 201) {
        setAuthenticated(true);
      }
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-dark-100' : 'bg-gray-100'}`}>
      <form
        onSubmit={handleRegister}
        className={`bg-white p-6 rounded shadow-md ${darkMode ? 'bg-dark-200' : 'bg-white'}`}
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-600'}`}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
