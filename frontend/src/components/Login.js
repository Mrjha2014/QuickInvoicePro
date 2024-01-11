import React, { useState } from 'react';
import useAuth from '../auth/useAuth';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label htmlFor="email" className="block text-sm">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
