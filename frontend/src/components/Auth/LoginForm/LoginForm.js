/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { login } from '../../../services/api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa' // Import eye icons
import ReCAPTCHA from 'react-google-recaptcha'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
  const [error, setError] = useState([])
  const [captchaToken, setCaptchaToken] = useState(null) //reCAPTCHA
  const navigate = useNavigate()

  const handleCaptcha = (token) => {
    setCaptchaToken(token)
  }

  const handleLogin = async () => {
    if (!captchaToken) {
      setError('Please complete the Captcha')
      return
    }

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
    }
  }

  return (
    <div className="flex min-h-screen bg-[#042326]">
      <div className="animate-slide-in-left mx-auto p-10">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Sign In
        </h2>
        <div className="flex justify-center pb-4 text-center">
          <Link to="/">
            <img
              src="/assets/highestwaves-logo.png"
              alt="Highest Waves Logo"
              className="w-40 transition-transform duration-200 hover:scale-105"
            />
          </Link>
        </div>

        <div className="w-full rounded-lg border-2 border-[#0A3A40] p-8 shadow-lg">
          {error && (
            <div className="mb-4 text-center text-red-500">{error}</div> // Display the error message
          )}
          <form>
            <div className="mb-10">
              <label
                htmlFor="Username"
                className="block text-sm font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="Username"
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

            <div className="mb-10">
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
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
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
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full rounded-md border border-transparent bg-gradient-to-r from-[#1D7373] to-[#0F5959] px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-[#107361] hover:to-[#0F5959]"
            >
              Continue
            </button>
          </form>

          <div className="flex justify-center mt-8">
            <ReCAPTCHA
              sitekey="6LdhImoqAAAAAEzZyQrQ-eK5HnhSqsMbk1DW9YMh"
              onChange={handleCaptcha}
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">Don't have an account?</p>
            <Link
              to="/register"
              className="font-medium text-[#1D7373] transition-colors duration-200 hover:text-[#107361]"
            >
              Register here
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-[#1D7373] transition-colors duration-200 hover:text-[#107361] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
