import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../services/api/users'; // Adjust the import path as needed

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-4">Users</h2>
      {users.length === 0 ? (
        <p className="text-lg">No users found.</p>
      ) : (
        <div>
          {users.map(user => (
            <div 
              key={user.id}  // Assuming each user has a unique 'id'
              className="p-3 mb-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold">{user.username}</h3>
              <p className="text-md">Email: {user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
