import React, { useState } from 'react'
import { forgotPassword } from '../../services/api/users'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('') // State for feedback message
  const [error, setError] = useState('') // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      // Call the forgotPassword function
      await forgotPassword(email)
      setMessage('Reset password email has been sent! Check your inbox.')
    } catch (err) {
      console.error('Error sending reset password link:', err)
      setError('Failed to send reset email. Please try again later.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#042326] p-6">
      <div className="w-full max-w-md rounded-lg bg-[#0A3A40] p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Forgot Password
        </h1>

        {/* Display feedback messages */}
        {message && (
          <div className="mb-4 text-center text-green-500">{message}</div>
        )}
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white"
            >
              Enter your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              required
              className="block w-full rounded-md border border-[#107361] bg-[#0A3A40] px-4 py-2 text-white shadow-sm focus:border-[#1D7373] focus:outline-none focus:ring-[#1D7373]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-gradient-to-r from-[#1D7373] to-[#0F5959] px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:scale-105 hover:from-[#107361] hover:to-[#0F5959]"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
