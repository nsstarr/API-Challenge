import { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [roles, setRoles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
       const token = localStorage.getItem('token');
      // Register the user using the access token
      const registeredUser = await registerUser(email, password, roles, token);

      console.log('Registered User:', registeredUser);
      console.log('Token:', token);

    } catch (error) {
      console.error(error);
    }
  };


    return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-10">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <div className="space-y-4">
          <form>
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </form>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="password"
              placeholder="Confirm your password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Roles</label>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="number"
              placeholder="Enter your roles"
              value={roles}
              onChange={(e) => setRoles([parseInt(e.target.value)])}
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;