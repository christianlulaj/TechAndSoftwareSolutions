import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const CreateAccountPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

  const handleCreateAccount = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/register', { email, password })
      .then(res => {
        console.log(res.data);
        setStatusMessage('Account created successfully!');
        setStatusType('success');
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 409) {
            setStatusMessage('An account with this email already exists.');
            setStatusType('error');
          } else if (err.response.status === 400) {
            setStatusMessage('Email and password are required.');
            setStatusType('error');
          } else {
            setStatusMessage('Something went wrong. Please try again.');
            setStatusType('error');
          }
        } else {
          setStatusMessage('Could not connect to the server.');
          setStatusType('error');
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full mt-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create Account</h2>
        <form onSubmit={handleCreateAccount}>
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
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Create Account
            </button>
            <NavLink to="/" className="text-sm text-indigo-600 hover:text-indigo-800">
              Already have an account? Login
            </NavLink>
          </div>
        </form>
        {statusMessage && (
          <div className={`mt-6 text-center text-sm ${statusType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAccountPage;
