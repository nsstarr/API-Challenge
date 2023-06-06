import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, resetPassword } from '../services/api'; // Import the login API function

const Login = () => {
    const navigateTo = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      console.log(token)
      localStorage.setItem('token', token); // Store the token in local storage
      console.log('Login successful!')
      navigateTo('/users');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

   const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      console.log('Reset password email sent!');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

 
 return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-10">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;