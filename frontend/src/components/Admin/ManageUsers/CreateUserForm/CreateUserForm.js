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
        <form className="mx-auto mb-6 max-w-4xl bg-white border border-brand-gray-light rounded-xl shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-brand-blue-dark to-brand-blue p-4">
            <h2 className="text-xl font-bold text-white">Create New User</h2>
            <p className="text-sm text-brand-gray-light opacity-90">Add a new user to the system</p>
          </div>
          
          <div className="p-5 space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-brand-blue-dark mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                value={userDetails.username}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                  validationErrors.username 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-brand-gray-light focus:border-brand-blue focus:ring-brand-blue/20'
                } bg-white text-brand-blue-dark placeholder-brand-gray`}
              />
              {validationErrors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {validationErrors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-brand-blue-dark mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={userDetails.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                  validationErrors.email 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-brand-gray-light focus:border-brand-blue focus:ring-brand-blue/20'
                } bg-white text-brand-blue-dark placeholder-brand-gray`}
              />
              {validationErrors.email && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-brand-blue-dark mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={userDetails.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                  validationErrors.password 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-brand-gray-light focus:border-brand-blue focus:ring-brand-blue/20'
                } bg-white text-brand-blue-dark placeholder-brand-gray`}
              />
              {validationErrors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-brand-blue-dark mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={userDetails.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:outline-none focus:ring-2 text-sm ${
                  validationErrors.confirmPassword 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-brand-gray-light focus:border-brand-blue focus:ring-brand-blue/20'
                } bg-white text-brand-blue-dark placeholder-brand-gray`}
              />
              {validationErrors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-xs font-semibold text-brand-blue-dark mb-1"
              >
                Role
              </label>
              <select
                id="role"
                value={userDetails.role}
                onChange={handleRoleChange}
                className="w-full px-3 py-2 border border-brand-gray-light rounded-md bg-white text-brand-blue-dark text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
              >
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-xs font-semibold text-brand-blue-dark mb-1">
                Profile Image
              </label>
              <label className={`flex cursor-pointer items-center justify-center w-full px-3 py-4 border-2 border-dashed rounded-md transition-all duration-300 hover:border-brand-blue hover:bg-brand-gray-light/50 ${
                validationErrors.image ? 'border-red-500' : 'border-brand-gray-light'
              }`}>
                <div className="text-center">
                  <FaImage className="mx-auto h-6 w-6 text-brand-gray mb-1" />
                  <span className="text-xs text-brand-gray">
                    {imageName === 'No file chosen' ? 'Choose profile image' : imageName}
                  </span>
                </div>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {validationErrors.image && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.image}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-brand-gray-light">
              <button
                type="button"
                onClick={handleCreateUser}
                className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white px-4 py-3 rounded-md font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create User
              </button>
            </div>
          </div>
          
          {/* Display validation errors */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="px-5 pb-4">
              <UserRegisterError message="Please fix the errors above and try again." />
            </div>
          )}
        </form>
      )}
    </div>
  )
}

export default CreateUserForm
