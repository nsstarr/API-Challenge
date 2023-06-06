import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Import the login API function

const Login = () => {
    const navigateTo = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      localStorage.setItem('token', token);
      console.log('Login successful!')
      navigateTo('/users');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;