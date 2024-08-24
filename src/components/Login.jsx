import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // Success or error type

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('https://techandsoftwaresolutions-production.up.railway.app/login', { email, password })
      .then(res => {
        setLoginMessage('Login successful! Redirecting...');
        setMessageType('success'); // Set message type to success
      })
      .catch(err => {
        setLoginMessage('Login failed. Please check your credentials and try again.');
        setMessageType('error'); // Set message type to error
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              className="mt-1 px-4 py-3 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="mt-1 px-4 py-3 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md w-full sm:w-auto focus:outline-none focus:shadow-outline"
            >
              Sign in
            </button>
            {loginMessage && (
              <p className={`mt-4 text-sm font-semibold ${messageType === 'success' ? 'text-green-600' : 'text-red-600'} w-full text-center`}>
                {loginMessage}
              </p>
            )}
            <NavLink to="/create-account" className="text-sm text-indigo-600 hover:text-indigo-800 mt-4">
              Don't have an account? Create one
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;