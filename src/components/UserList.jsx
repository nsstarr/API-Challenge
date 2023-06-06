import { useEffect, useState } from 'react';
import { getUsers } from '../services/api'; // Import the getUsers API function

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers(); // Call the getUsers API function
        setUsers(usersData);
      } catch (error) {
        console.error('Error retrieving users:', error);
      }
    };
    
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
};

export default UserList;