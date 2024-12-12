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
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-lg p-6 bg-[#0A3A40] rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <Link to="/">
            <img
              src="/assets/highestwaves-logo.png"
              alt="Highest Waves Logo"
              className="w-40 transition-transform duration-200 hover:scale-105"
            />
          </Link>
        </div>
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Create an account
        </h2>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {validationError && (
          <div className="mb-4 text-yellow-500 text-center">
            {validationError}
          </div>
        )}

        <form className="space-y-4">
          <div>
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
              className="w-full mt-1 rounded-md bg-[#0A3A40] text-white border border-[#107361] px-3 py-2 focus:border-[#1D7373] focus:outline-none"
            />
          </div>

          <div>
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
              className="w-full mt-1 rounded-md bg-[#0A3A40] text-white border border-[#107361] px-3 py-2 focus:border-[#1D7373] focus:outline-none"
            />
          </div>

          <div>
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
                  validatePassword(e.target.value)
                }}
                className="w-full mt-1 rounded-md bg-[#0A3A40] text-white border border-[#107361] px-3 py-2 focus:border-[#1D7373] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
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
                className="w-full mt-1 rounded-md bg-[#0A3A40] text-white border border-[#107361] px-3 py-2 focus:border-[#1D7373] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-2 right-3 text-white"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <ReCAPTCHA
              sitekey="6LdhImoqAAAAAEzZyQrQ-eK5HnhSqsMbk1DW9YMh"
              onChange={handleCaptcha}
            />
          </div>

          <button
            type="button"
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-[#1D7373] to-[#0F5959] text-white py-2 rounded-md mt-4 hover:scale-105 transition-all"
          >
            Register
          </button>
        </form>

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
  )
}

export default RegisterForm
