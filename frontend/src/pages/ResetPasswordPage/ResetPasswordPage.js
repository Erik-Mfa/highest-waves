import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { resetPassword } from '../../services/api/users'
import { FaEye, FaEyeSlash } from 'react-icons/fa' // Import eye icons

const ResetPasswordPage = () => {
  const { token } = useParams() // Extract token from URL params
  const [newPassword, setNewPassword] = useState('') // New password state
  const [confirmPassword, setConfirmPassword] = useState('') // Confirm password state
  const [validationError, setValidationError] = useState('') // State for password validation errors
  const [successMessage, setSuccessMessage] = useState('') // Success message state
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // State to toggle confirm password visibility

  const validatePassword = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!hasCapitalLetter) {
      return 'Password must contain at least one capital letter.'
    } else if (!hasSymbol) {
      return 'Password must contain at least one symbol.'
    }
    return '' // Clear the validation error if the password is valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationError('') // Clear previous errors
    setSuccessMessage('') // Clear success message

    // Validate password match
    if (newPassword !== confirmPassword) {
      setValidationError('Passwords do not match!')
      return
    }

    // Validate the new password
    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      setValidationError(passwordError)
      return
    }

    try {
      // Post request to reset password with token and new password
      await resetPassword(newPassword, token) // Pass token to resetPassword
      setSuccessMessage('Password reset successfully!')
    } catch (error) {
      console.error('Error resetting password:', error)
      setValidationError('Error resetting password. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#042326] p-6">
      <div className="w-full max-w-md rounded-lg bg-[#0A3A40] p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Reset Password
        </h1>

        {validationError && (
          <div className="mb-4 text-center text-red-500">{validationError}</div>
        )}
        {successMessage && (
          <div className="mb-4 text-center text-green-500">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-white"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="block w-full rounded-md border border-[#107361] bg-[#0A3A40] px-4 py-2 text-white shadow-sm focus:border-[#1D7373] focus:outline-none focus:ring-[#1D7373]"
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-white" />
                ) : (
                  <FaEye className="text-white" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-medium text-white"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="block w-full rounded-md border border-[#107361] bg-[#0A3A40] px-4 py-2 text-white shadow-sm focus:border-[#1D7373] focus:outline-none focus:ring-[#1D7373]"
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-white" />
                ) : (
                  <FaEye className="text-white" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#107361] py-2 text-white hover:bg-[#1D7373]"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage
