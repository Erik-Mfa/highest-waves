import React, { useEffect, useState } from 'react';
import { createUser, getUsers, deleteUser } from '../../../services/api/users'; // Adjust the import path as needed
import Loading from '../../Loading/Loading'; // Import the Loading component
import { FaTrash, FaImage } from 'react-icons/fa';
import UserRegisterError from '../../Error/UserRegisterError/UserRegisterError'; // Adjust import path
import ConfirmMessage from '../../Messages/ConfirmMessage/ConfirmMessage';


const ManageUsers = () => {
  const [userDetails, setUserDetails] = useState({ 
    email: '', 
    username: '', 
    password: '', 
    confirmPassword: '', 
    role: 'customer', 
    image: '' 
  });

  const [users, setUsers] = useState([]);
  const [imageName, setImageName] = useState('No file chosen'); // State for image name
  
  const [isFormDropdownOpen, setIsFormDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [deletedUserId, setDeletedUserId] = useState(null); // State for deleted beat ID
  const [userToDelete, setUserToDelete] = useState(null); // State for selected user to delete

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

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
  };

  const cancelDelete = () => {
    setUserToDelete(null);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      await handleDeleteUser(userToDelete.id);
      setUserToDelete(null);
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
    if (!userDetails.image) errors.image = 'Image is required';
    if (userDetails.password !== userDetails.confirmPassword) errors.confirmPassword = 'Passwords must match';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;
  
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', userDetails.username);
      formData.append('email', userDetails.email);
      formData.append('password', userDetails.password);
      formData.append('confirmPassword', userDetails.confirmPassword);
      formData.append('role', userDetails.role);
      if (userDetails.image) {
        formData.append('image', userDetails.image);
      }
  
      const response = await createUser(formData); // Ensure createUser can handle FormData
      if (response) {
        alert('User created successfully!');
        setUserDetails({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'customer',
          image: ''
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

  const toggleFormDropdown = () => {
    setIsFormDropdownOpen(!isFormDropdownOpen);
 };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserDetails({ ...userDetails, [id]: value });
  };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setUserDetails({ ...userDetails, image: file });
        setImageName(file.name);
      }
    };

  const handleRoleChange = (e) => {
    setUserDetails({ ...userDetails, role: e.target.value });
  };

  return (
    <div className='p-10 m-10 bg-gray-800 border border-gray-700 rounded-lg shadow-lg'>
      {/* Confirm delete message */}
      {userToDelete && (
        <ConfirmMessage
          message={`Are you sure that you want to delete ${userToDelete.username}? All the information related will also be deleted.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
     

     <div className="mb-4 mx-10 flex justify-center">
        <button
          onClick={toggleFormDropdown}
          className="bg-teal-800 text-white text-lg px-8 py-2 rounded-lg hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-110"
        >
          Create User
        </button>
      </div>

      {isFormDropdownOpen && (

      <form className="space-y-4 mb-4 border border-gray-600 p-4 max-w-md mx-auto rounded-lg">
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

        <div className="mb-4 mx-10">
            <label htmlFor="image" className="block text-sm font-medium text-white">
              Image
            </label>
            <div className="flex items-center">
              <label className="flex items-center px-3 py-2 bg-gray-700 rounded-md shadow-sm cursor-pointer hover:bg-gray-600">
                <FaImage className="mr-2" />
                <span>{imageName}</span>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            {validationErrors.image && <p className="text-red-500 text-sm">{validationErrors.image}</p>}
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
      {/* Display validation errors */}
      {Object.keys(validationErrors).length > 0 && (
        <UserRegisterError message="Please fix the errors above and try again." />
      )}
      </form>
      
      )}

<div className=" text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">


  <div className="space-y-4">
    {loading && <Loading />}
    {users.map(user => (
      <div
        key={user.id} // Assuming each user has a unique 'id'
        className="flex items-center justify-between mb-4 p-4 border border-gray-600 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300 ease-in-out"
      >
        <img
          src={`${process.env.REACT_APP_API_URL}/${user.image}`}
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-cyan-600" // Adding a border around the image
        />
        <div className="flex-grow">
          <h3 className="text-md font-semibold text-white">{user.username}</h3>
          <p className="text-sm text-gray-400">Email: {user.email}</p>
          <p className="text-sm text-gray-400">Role: {user.role}</p>
        </div>

        <button
          onClick={() => confirmDeleteUser(user)}
          className="bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
          aria-label={`Delete user ${user.username}`}
        >
          <FaTrash className="text-lg" />
        </button>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default ManageUsers;
