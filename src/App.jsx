import {Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route exact path="/users" element={<UserList/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="*" element={<Login/>} /> 
    </Routes>
  );
};

export default App;