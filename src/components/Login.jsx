import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios"; // uimport axios

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/login', { email, password })
      .then(res => {
        console.log('Login successful:', res.data.message);

      })
      .catch(err => {
        console.error('Login failed:', err.response ? err.response.data.message : err.message);
        // Optionally display an error message to the user
      });
  };
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              className="mt-1 px-4 py-3 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-400 focus:bg-white focus:ring-0"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 px-4 py-3 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-400 focus:bg-white focus:ring-0"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Sign in
            </button>
            <NavLink to="/create-account" className="text-sm text-indigo-600 hover:text-indigo-800">
              Create account
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
