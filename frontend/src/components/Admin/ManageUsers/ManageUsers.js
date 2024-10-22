import React, { useEffect, useState } from 'react'
import { createUser, getUsers, deleteUser } from '../../../services/api/users' // Adjust the import path as needed
import Loading from '../../Loading/Loading' // Import the Loading component
import { FaTrash, FaImage } from 'react-icons/fa'
import UserRegisterError from '../../Error/UserRegisterError/UserRegisterError' // Adjust import path
import ConfirmMessage from '../../Messages/ConfirmMessage/ConfirmMessage'

const ManageUsers = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    image: ''
  })

  const [users, setUsers] = useState([])
  const [imageName, setImageName] = useState('No file chosen') // State for image name

  const [isFormDropdownOpen, setIsFormDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [validationErrors, setValidationErrors] = useState({})
  const [userToDelete, setUserToDelete] = useState(null) // State for selected user to delete

  const fetchUsers = async () => {
    try {
      const userData = await getUsers()
      setUsers(userData)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId)
      if (response.success) {
        setUsers(users.filter((user) => user.id !== userId))
        fetchUsers()
      } else {
        console.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const confirmDeleteUser = (user) => {
    setUserToDelete(user)
  }

  const cancelDelete = () => {
    setUserToDelete(null)
  }

  const confirmDelete = async () => {
    if (userToDelete) {
      await handleDeleteUser(userToDelete.id)
      setUserToDelete(null)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const validateForm = () => {
    const errors = {}

    if (!userDetails.username) errors.username = 'Username is required'
    if (!userDetails.email) errors.email = 'Email is required'
    if (!userDetails.password) errors.password = 'Password is required'
    if (!userDetails.image) errors.image = 'Image is required'
    if (userDetails.password !== userDetails.confirmPassword)
      errors.confirmPassword = 'Passwords must match'

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCreateUser = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('username', userDetails.username)
      formData.append('email', userDetails.email)
      formData.append('password', userDetails.password)
      formData.append('confirmPassword', userDetails.confirmPassword)
      formData.append('role', userDetails.role)
      if (userDetails.image) {
        formData.append('image', userDetails.image)
      }

      const response = await createUser(formData) // Ensure createUser can handle FormData
      if (response) {
        alert('User created successfully!')
        setUserDetails({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'customer',
          image: ''
        })
        fetchUsers()
      } else {
        console.error('Failed to create user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFormDropdown = () => {
    setIsFormDropdownOpen(!isFormDropdownOpen)
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setUserDetails({ ...userDetails, [id]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUserDetails({ ...userDetails, image: file })
      setImageName(file.name)
    }
  }

  const handleRoleChange = (e) => {
    setUserDetails({ ...userDetails, role: e.target.value })
  }

  return (
    <div className="m-10 rounded-lg border border-gray-700 bg-gray-800 p-10 shadow-lg">
      {/* Confirm delete message */}
      {userToDelete && (
        <ConfirmMessage
          message={`Are you sure that you want to delete ${userToDelete.username}? All the information related will also be deleted.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <div className="mx-10 mb-4 flex justify-center">
        <button
          onClick={toggleFormDropdown}
          className="rounded-lg bg-teal-800 px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50"
        >
          Create User
        </button>
      </div>

      {isFormDropdownOpen && (
        <form className="mx-auto mb-4 max-w-md space-y-4 rounded-lg border border-gray-600 p-4">
          {/* Username */}
          <div className="mx-10 mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={userDetails.username}
              onChange={handleInputChange}
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.username ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.username && (
              <p className="text-sm text-red-500">
                {validationErrors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mx-10 mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={userDetails.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.email ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.email && (
              <p className="text-sm text-red-500">{validationErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mx-10 mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={userDetails.password}
              onChange={handleInputChange}
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.password ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.password && (
              <p className="text-sm text-red-500">
                {validationErrors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mx-10 mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={userDetails.confirmPassword}
              onChange={handleInputChange}
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.confirmPassword && (
              <p className="text-sm text-red-500">
                {validationErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="mx-10 mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-white"
            >
              Role
            </label>
            <select
              id="role"
              value={userDetails.role}
              onChange={handleRoleChange}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-white shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <div className="mx-10 mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-white"
            >
              Image
            </label>
            <div className="flex items-center">
              <label className="flex cursor-pointer items-center rounded-md bg-gray-700 px-3 py-2 shadow-sm hover:bg-gray-600">
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
            {validationErrors.image && (
              <p className="text-sm text-red-500">{validationErrors.image}</p>
            )}
          </div>

          {/* Submit */}
          <div className="mx-10 mb-4">
            <button
              type="button"
              onClick={handleCreateUser}
              className="w-full rounded-md border border-transparent bg-cyan-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-cyan-700"
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

      <div className=" mx-auto max-w-3xl rounded-lg p-6 text-white shadow-lg">
        <div className="space-y-4">
          {loading && <Loading />}
          {users.map((user) => (
            <div
              key={user.id} // Assuming each user has a unique 'id'
              className="mb-4 flex items-center justify-between rounded-lg border border-gray-600 bg-gray-800 p-4 transition-colors duration-300 ease-in-out hover:bg-gray-700"
            >
              <img
                // eslint-disable-next-line no-undef
                src={`${process.env.REACT_APP_API_URL}/${user.image}`}
                alt="User Avatar"
                className="mr-4 size-20 rounded-full border-2 border-cyan-600 object-cover" // Adding a border around the image
              />
              <div className="grow">
                <h3 className="text-md font-semibold text-white">
                  {user.username}
                </h3>
                <p className="text-sm text-gray-400">Email: {user.email}</p>
                <p className="text-sm text-gray-400">Role: {user.role}</p>
              </div>

              <button
                onClick={() => confirmDeleteUser(user)}
                className="flex items-center justify-center rounded-full bg-red-600 p-2 text-white transition-all duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`Delete user ${user.username}`}
              >
                <FaTrash className="text-lg" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
