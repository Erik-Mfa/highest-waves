import React, { useEffect, useState } from 'react'
import { getUsers, createUser } from '../../../../services/api/users'
import { FaImage } from 'react-icons/fa'
import UserRegisterError from '../../../Error/UserRegisterError/UserRegisterError'

// eslint-disable-next-line react/prop-types
const CreateUserForm = ({ formOpen }) => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    image: ''
  })
  const [, setUsers] = useState([])
  const [validationErrors, setValidationErrors] = useState({})
  const [imageName, setImageName] = useState('No file chosen') // State for image name
  const [isFormDropdownOpen, setIsFormDropdownOpen] = useState(false)

  const fetchUsers = async () => {
    try {
      const userData = await getUsers()
      setUsers(userData)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
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

  const handleCreateUser = async () => {
    if (!validateForm()) return

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
    }
  }

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

  const toggleFormDropdown = () => {
    setIsFormDropdownOpen(!formOpen)
  }

  useEffect(() => {
    toggleFormDropdown()
  }, [formOpen])

  return (
    <div>
      {isFormDropdownOpen && (
        <form className="mx-8 mb-8 bg-white border border-brand-gray-light rounded-xl shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-blue p-6">
            <h2 className="text-2xl font-bold text-white">Create New User</h2>
            <p className="text-brand-gray-light opacity-90">Add a new user to the system</p>
          </div>
          
          <div className="p-8 space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-brand-black mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                value={userDetails.username}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
                  validationErrors.username 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-brand-gray-light focus:border-brand-blue focus:ring-brand-blue/20'
                } bg-white text-brand-black placeholder-brand-gray`}
              />
              {validationErrors.username && (
                <p className="text-sm text-red-500 mt-1">
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

            {/* Submit Button */}
            <div className="pt-4 border-t border-brand-gray-light">
              <button
                type="button"
                onClick={handleCreateUser}
                className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-blue/30"
              >
                Create User
              </button>
            </div>
          </div>
          {/* Display validation errors */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="mx-8 mb-4">
              <UserRegisterError message="Please fix the errors above and try again." />
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default CreateUserForm
