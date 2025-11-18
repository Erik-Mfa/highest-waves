import React, { useState } from 'react'
import { register, login } from '../../../services/api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaEnvelope, FaUser, FaLock } from 'react-icons/fa'
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
  const [isLoading, setIsLoading] = useState(false)
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

    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0B1420] to-[#124D82] p-4">
      <div className="w-full max-w-md transform space-y-8 rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:bg-white/15">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <img
              src={`${process.env.PUBLIC_URL || ''}/assets/highestwaves-white-logo.png`}
              alt="Highest Waves Logo"
              className="mx-auto h-20 w-auto transform transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Join our community of music creators
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 p-4 text-center text-sm text-red-400 backdrop-blur-sm">
            {error}
          </div>
        )}

        {validationError && (
          <div className="rounded-lg bg-yellow-500/10 p-4 text-center text-sm text-yellow-400 backdrop-blur-sm">
            {validationError}
          </div>
        )}

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="block w-full rounded-lg border border-gray-600 bg-white/10 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-[#3876AE] focus:outline-none focus:ring-2 focus:ring-[#3876AE] focus:ring-opacity-50"
                placeholder="Username"
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="block w-full rounded-lg border border-gray-600 bg-white/10 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-[#3876AE] focus:outline-none focus:ring-2 focus:ring-[#3876AE] focus:ring-opacity-50"
                placeholder="Email address"
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={credentials.password}
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value })
                  validatePassword(e.target.value)
                }}
                className="block w-full rounded-lg border border-gray-600 bg-white/10 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-[#3876AE] focus:outline-none focus:ring-2 focus:ring-[#3876AE] focus:ring-opacity-50"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                )}
              </button>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
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
                className="block w-full rounded-lg border border-gray-600 bg-white/10 px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-[#3876AE] focus:outline-none focus:ring-2 focus:ring-[#3876AE] focus:ring-opacity-50"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LdhImoqAAAAAEzZyQrQ-eK5HnhSqsMbk1DW9YMh"
              onChange={handleCaptcha}
            />
          </div>

          <button
            type="button"
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full rounded-lg bg-[#3876AE] px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#124D82] focus:outline-none focus:ring-2 focus:ring-[#3876AE] focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-[#3876AE] transition-all duration-200 hover:text-[#124D82] hover:underline hover:scale-105 inline-block"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
