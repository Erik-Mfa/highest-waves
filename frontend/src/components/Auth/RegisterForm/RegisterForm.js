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
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('') // State for error messages
  const [validationError, setValidationError] = useState('') // State for password validation errors
  const [captchaToken, setCaptchaToken] = useState(null) //reCAPTCHA
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
      setValidationError('') // Clear the validation error if the password is valid
      return true
    }
  }

  const handleRegister = async () => {
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!validatePassword(credentials.password)) {
      return // Exit if password validation fails
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
        console.log('Attempting to log in user...')
        const loggedIn = await login({
          email: credentials.email,
          password: credentials.password
        })
        console.log('Login response:', loggedIn)

        if (loggedIn) {
          console.log('User logged in successfully')
          navigate('/')
        } else {
          console.log('Login failed after registration')
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 429) {
        setError('Too many attempts. Please try again after some time.')
      } else {
        setError('Registration failed. Please try again.')
      }
      console.error('Error occurred:', err)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#042326]">
      {/* Left side: Form (1/3 of the page) */}
      <div className="animate-slide-in-left flex w-full flex-col justify-start bg-[#042326] p-8 md:w-1/3">
        <div className="flex justify-center pb-4 text-center">
          <Link to="/">
            <img
              src="/assets/highestwaves-logo.png"
              alt="Highest Waves Logo"
              className="w-64 transition-transform duration-200 hover:scale-105"
            />
          </Link>
        </div>
        <h2 className="mb-8 text-center text-3xl font-bold tracking-wider text-white">
          Create an account
        </h2>
        <div className="w-full rounded-lg border-2 border-[#0A3A40] p-8 shadow-lg">
          {error && (
            <div className="mb-4 text-center text-red-500">{error}</div>
          )}
          {validationError && (
            <div className="mb-4 text-center text-yellow-500">
              {validationError}
            </div> // Display the password validation error
          )}

          <form>
            <div className="mb-8">
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

            <div className="mb-8">
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

            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
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
                    validatePassword(e.target.value) // Validate password on change
                  }}
                  className="mt-1 block w-full rounded-md border border-[#107361] bg-[#0A3A40] px-4 py-2 text-white shadow-sm focus:border-[#1D7373] focus:outline-none focus:ring-[#1D7373] sm:text-sm"
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
              {validationError && (
                <div className="text-red-500">{validationError}</div>
              )}
            </div>

            <div className="mb-8">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
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

            <div className="flex justify-center p-4">
              <ReCAPTCHA
                sitekey="6LdhImoqAAAAAEzZyQrQ-eK5HnhSqsMbk1DW9YMh"
                onChange={handleCaptcha}
              />
            </div>

            <button
              type="button"
              onClick={handleRegister}
              className="mt-6 w-full rounded-md border border-transparent bg-gradient-to-r from-[#1D7373] to-[#0F5959] px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
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
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#042326] opacity-60"></div>
      </div>
    </div>
  )
}

export default RegisterForm
