import React, { useState } from 'react'
import { register, login } from '../../../services/api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa' // Import eye icons
import ReCAPTCHA from 'react-google-recaptcha'

const RegisterForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')
  const [captchaToken, setCaptchaToken] = useState(null)
  const navigate = useNavigate()

  const handleCaptcha = (token) => {
    setCaptchaToken(token)
  }

  const validatePassword = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!hasCapitalLetter) {
      setValidationError('Password must contain at least one capital letter.')
      return false
    } else if (!hasSymbol) {
      setValidationError('Password must contain at least one symbol.')
      return false
    } else if (!captchaToken) {
      setValidationError('Please complete the CAPTCHA')
      return false
    } else {
      setValidationError('')
      return true
    }
  }

  const handleRegister = async () => {
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!validatePassword(credentials.password)) {
      return
    }

    try {
      console.log('Attempting to register user...')
      const response = await register({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        captchaToken
      })
      console.log('Registration response:', response)

      if (response && response.success) {
        const loggedIn = await login({
          email: credentials.email,
          password: credentials.password
        })

        if (loggedIn) navigate('/')
      }
    } catch (err) {
      if (err.response && err.response.status === 429) {
        setError('Too many attempts. Please try again after some time.')
      } else {
        setError('Registration failed. Please try again.')
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-[#042326]">
      <div className="animate-slide-in-left mx-auto p-10">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Create an account
        </h2>
        <div className="flex justify-center pb-4 text-center">
          <Link to="/">
            <img
              src="/assets/highestwaves-logo.png"
              alt="Highest Waves Logo"
              className="w-40 transition-transform duration-300 hover:scale-110 drop-shadow-md"
            />
          </Link>
        </div>
        <div className="w-full rounded-lg border-2 border-[#0A3A40] p-8 shadow-lg">
          {error && (
            <div className="mb-4 text-red-400 text-center bg-red-900 bg-opacity-20 p-2 rounded-md">
              {error}
            </div>
          )}
          {validationError && (
            <div className="mb-4 text-yellow-400 text-center bg-yellow-900 bg-opacity-20 p-2 rounded-md">
              {validationError}
            </div>
          )}
          <form>
            <div className="mb-10">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-white"
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

            <div className="mb-10">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white"
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

            <div className="mb-10">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={credentials.password}
                  onChange={(e) => {
                    setCredentials({ ...credentials, password: e.target.value })
                    validatePassword(e.target.value)
                  }}
                  className="mt-1 block w-full rounded-md border border-[#107361] bg-[#0A3A40] px-4 py-2 text-white shadow-sm focus:border-[#1D7373] focus:outline-none focus:ring-[#1D7373] sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mb-10">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-white"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
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
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-3 right-3 text-white"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRegister}
              className="w-full rounded-md border border-transparent bg-gradient-to-r from-[#1D7373] to-[#0F5959] px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-[#107361] hover:to-[#0F5959]"
            >
              Sign Up
            </button>
          </form>
          <div className="flex justify-center mt-8">
            <ReCAPTCHA
              sitekey="6LdhImoqAAAAAEzZyQrQ-eK5HnhSqsMbk1DW9YMh"
              onChange={handleCaptcha}
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">Already have an account?</p>
            <Link
              to="/login"
              className="text-[#1D7373] hover:text-[#107361] font-medium"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
