import React, { useEffect, useState } from 'react';
import { createUser, getUsers, deleteUser } from '../../../services/api/users'; // Adjust the import path as needed
import Loading from '../../Loading/Loading'; // Import the Loading component
import { FaTrash } from 'react-icons/fa';

const ManageUsers = () => {
  const [userDetails, setUserDetails] = useState({ email: '', username: '', password: '', confirmPassword: '', role: 'customer' });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [deletedUserId, setDeletedUserId] = useState(null); // State for deleted beat ID


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

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.success) {
        setDeletedUserId(userId);
        setUsers(users.filter((user) => user.id !== userId)); 
        fetchUsers();
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!userDetails.username) errors.username = 'Username is required';
    if (!userDetails.email) errors.email = 'Email is required';
    if (!userDetails.password) errors.password = 'Password is required';
    if (userDetails.password !== userDetails.confirmPassword) errors.confirmPassword = 'Passwords must match';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await createUser({
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
        role: userDetails.role
      });
      if (response) {
        alert('User created successfully!');
        setUserDetails({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'customer'
        });
        fetchUsers();
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserDetails({ ...userDetails, [id]: value });
  };

  const handleRoleChange = (e) => {
    setUserDetails({ ...userDetails, role: e.target.value });
  };

  return (
    <div>
      {loading && <Loading />} {/* Show loading component if loading */}  
      <form className="space-y-4 mb-4 border border-gray-600 p-4 max-w-md mx-auto rounded-lg bg-gray-800">
        {/* Username */}
        <div className="mb-4 mx-10">
          <label htmlFor="username" className="block text-sm font-medium text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={userDetails.username}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-4 py-2 border ${validationErrors.username ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white`}
          />
          {validationErrors.username && <p className="text-red-500 text-sm">{validationErrors.username}</p>}
        </div>

        {/* Email */}
        <div className="mb-4 mx-10">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={userDetails.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-4 py-2 border ${validationErrors.email ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white`}
          />
          {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4 mx-10">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={userDetails.password}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-4 py-2 border ${validationErrors.password ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white`}
          />
          {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4 mx-10">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={userDetails.confirmPassword}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-4 py-2 border ${validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white`}
          />
          {validationErrors.confirmPassword && <p className="text-red-500 text-sm">{validationErrors.confirmPassword}</p>}
        </div>

        {/* Role */}
        <div className="mb-4 mx-10">
          <label htmlFor="role" className="block text-sm font-medium text-white">
            Role
          </label>
          <select
            id="role"
            value={userDetails.role}
            onChange={handleRoleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white"
          >
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {/* Submit */}
        <div className="mb-4 mx-10">
          <button
            type="button"
            onClick={handleCreateUser}
            className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 ease-in-out"
          >
            Create User
          </button>
        </div>
      </form>

      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-center">Users</h2>
      {users.length === 0 ? (
        <p className="text-lg text-center">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map(user => (
            <div
              key={user.id} // Assuming each user has a unique 'id'
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col space-y-1">
                <h3 className="text-xl font-semibold">{user.username}</h3>
                <p className="text-sm">Email: {user.email}</p>
                <p className="text-sm">Role: {user.role}</p>
              </div>

              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                aria-label={`Delete user ${user.username}`}
              >
                <FaTrash className="text-lg" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default ManageUsers;
