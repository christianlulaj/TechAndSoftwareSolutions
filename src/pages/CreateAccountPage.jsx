import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(''); // Added state
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedPassword, setVerifiedPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' or 'error'

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (password !== verifiedPassword) {
      setStatusMessage('Passwords do not match');
      setStatusType('error');
      return;
    }

    axios.post('http://localhost:8081/register', {
      firstName,
      lastName,
      street,
      city,
      state,
      zip,
      phone,
      email,
      password
    })
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
            setStatusMessage('All fields are required.');
            setStatusType('error');
          }  else if (err.response.status == 422) {
            setStatusMessage('Invalid phone number format!');
            setStatusType('error');
          }
          else {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <form onSubmit={handleCreateAccount} className="space-y-6">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                id="first-name"
                type="text"
                className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="last-name"
                type="text"
                className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
            <input
              id="street"
              type="text"
              className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your street address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                id="city"
                type="text"
                className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <input
                id="state"
                type="text"
                className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input
                id="zip"
                type="text"
                className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your zip code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phone"
                type="text"
                className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="xxx-xxxx-xxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
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
              className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="verified-password" className="block text-sm font-medium text-gray-700">Verify Password</label>
            <input
              id="verified-password"
              type="password"
              className="mt-1 px-4 py-2 block w-full rounded-md bg-gray-100 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Re-enter your password"
              value={verifiedPassword}
              onChange={(e) => setVerifiedPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center mt-6">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg focus:outline-none focus:shadow-outline transition-colors"
            >
              Create Account
            </button>
            <NavLink to="/" className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm">
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
