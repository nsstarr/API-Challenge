import { useEffect, useState } from 'react';
import { getUsers } from '../services/api'; // Import the getUsers API function
import USER_AVATAR from '../assets/user_avatar.avif'

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
   const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getUsers(token);
        const usersData = response.data; // Extract the 'data' property from the response
        setUsers(usersData);
      } catch (error) {
        console.error('Error retrieving users:', error);
      }
};
    
    fetchUsers();
  }, []);

   return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6">User List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <img
                src={USER_AVATAR}
                alt='User avatar'
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{user.email}</p>
                <p className="text-gray-500 text-sm">Role: {user.roles[0]?.name}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">Additional information:</p>
              <ul className="text-gray-600 text-xs">
                {Object.entries(user.data).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold">{key}: </span>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;