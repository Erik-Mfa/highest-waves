import React, { useState } from 'react'
import { register } from '../../../services/api/auth'
import { useNavigate, Link } from 'react-router-dom'

const RegisterForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const registered = await register({
      email: credentials.email,
      username: credentials.username,
      password: credentials.password
    })

    if (registered) {
      navigate('/')
    }
  }

  return (
    <div className="flex min-h-screen bg-[#042326]">
      {/* Left side: Form (1/3 of the page) */}
      <div className="mt-20 flex w-full animate-slide-in-left flex-col justify-start bg-[#042326] p-6 md:w-1/3">
        <div className="w-full rounded-lg border-2 border-[#0A3A40] p-8 shadow-lg">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-wider text-white">
            Create an account
          </h2>
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
          <form>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-[#107361] bg-[#0A3A40] px-4 py-2 text-white shadow-sm focus:border-[#1D7373] focus:outline-none focus:ring-[#1D7373] sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-[#107361] bg-[#0A3A40] px-4 py-2 text-white shadow-sm focus:border-[#1D7373] focus:outline-none focus:ring-[#1D7373] sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-[#107361] bg-[#0A3A40] px-4 py-2 text-white shadow-sm focus:border-[#1D7373] focus:outline-none focus:ring-[#1D7373] sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={credentials.confirmPassword}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    confirmPassword: e.target.value
                  })
                }
                className="mt-1 block w-full rounded-md border border-[#107361] bg-[#0A3A40] px-4 py-2 text-white shadow-sm focus:border-[#1D7373] focus:outline-none focus:ring-[#1D7373] sm:text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleRegister}
              className="mt-6 w-full rounded-md border border-transparent bg-gradient-to-r from-[#1D7373] to-[#0F5959] px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-[#107361] hover:to-[#0F5959]"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">Already have an account?</p>
            <Link
              to="/login"
              className="font-medium text-[#1D7373] transition-colors duration-200 hover:text-[#107361]"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>

      {/* Right side: Background Image (2/3 of the page) */}
      <div className="relative w-full overflow-hidden md:w-2/3">
        <img
          src="/assets/rizzo-edits.jpeg"
          alt="Background"
          className="size-full max-h-screen object-cover opacity-80"
        />
        {/* Overlay for neon effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#042326] opacity-60"></div>
      </div>
    </div>
  )
}

export default RegisterForm
