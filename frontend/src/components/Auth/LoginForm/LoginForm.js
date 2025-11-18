/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { login } from '../../../services/api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaEnvelope, FaUser, FaLock } from 'react-icons/fa'
import ReCAPTCHA from 'react-google-recaptcha'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState([])
  const [captchaToken, setCaptchaToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleCaptcha = (token) => {
    setCaptchaToken(token)
  }

  const handleLogin = async () => {
    if (!captchaToken) {
      setError('Please complete the Captcha')
      return
    }

    setIsLoading(true)
    try {
      const logged = await login({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        captchaToken
      })

      if (logged) {
        navigate('/')
        window.location.reload()
      }
    } catch (err) {
      if (err.response && err.response.status === 429) {
        setError('Too many login attempts. Please try again after 15 minutes.')
      } else {
        setError('Login failed. Please check your credentials.')
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
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Sign in to your account to continue
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="Username"
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
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
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
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-[#3876AE] transition-colors duration-200 hover:text-[#124D82]"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LfOfUArAAAAAHbEKcc0M8oXTFOko8fGlLofjd3W "
              onChange={handleCaptcha}
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
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
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-bold text-[#3876AE] transition-all duration-200 hover:text-[#124D82] hover:underline hover:scale-105 inline-block"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
