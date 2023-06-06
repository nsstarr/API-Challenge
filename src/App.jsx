import {Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';

const App = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>} />
       <Route exact path="/users" element={<UserList/>} /> 
    </Routes>
  );
};

export default App;