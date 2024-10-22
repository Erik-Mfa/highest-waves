/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaShoppingCart, FaMusic } from 'react-icons/fa'
import { logout } from '../../services/api/auth'
import PurchaseCart from '../PurchaseCart/PurchaseCart'
import './Header.css'

const Header = ({ user, admin }) => {
  const [showPurchaseCart, setShowPurchaseCart] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const success = await logout()
      if (success) {
        navigate('/')
      }
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  const handleNavigation = (path, sectionId) => {
    if (window.location.pathname === '/') {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(path)
      setTimeout(() => {
        document
          .getElementById(sectionId)
          .scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <>
      {/* Header */}
      <header className="shadow-header-shadow fixed left-0 top-0 z-50 w-full border-b-2 border-teal-950 bg-gray-900 text-white">
        <nav className="flex items-center justify-between p-2 px-12">
          {/* Left side of the header */}
          <ul className="flex items-center space-x-16">
            <Link to="/">
              <img
                src="/assets/highestwaves-logo.png"
                alt="Highest Waves Logo"
                className="w-28 transition-transform duration-200 hover:scale-105"
              />
            </Link>

            <li className="flex items-center text-lg text-white transition-transform duration-200 hover:scale-110 hover:bg-opacity-70">
              <button
                onClick={() => handleNavigation('/', 'beats-section')}
                style={{ fontFamily: '"REM"' }}
                className="flex items-center"
              >
                <FaMusic className="mr-2" /> {/* Music icon */}
                Explore
              </button>
            </li>
            <li className="text-lg text-white transition-transform duration-200 hover:scale-110 hover:bg-opacity-70">
              <button
                onClick={() => handleNavigation('/', 'about-section')}
                style={{ fontFamily: '"REM"' }}
              >
                About
              </button>
            </li>
          </ul>

          {/* Right side of the header */}
          <ul className="flex items-center space-x-10">
            <li>
              <button
                onClick={() => setShowPurchaseCart((prev) => !prev)}
                className="mr-2 flex items-center text-lg text-white transition-transform duration-200 hover:scale-110 hover:bg-opacity-70"
              >
                <FaShoppingCart size={28} className="align-middle" />
              </button>
            </li>

            {/* Welcome message */}
            {user && (
              <li className="flex items-center text-lg text-white">
                <span className="mr-2" style={{ fontFamily: '"REM"' }}>
                  Welcome, {user.username}!
                </span>{' '}
                {/* Display user's name */}
              </li>
            )}

            {user ? (
              <>
                {admin && (
                  <Link
                    className="transform rounded-lg bg-teal-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50"
                    to="/admin"
                    style={{ fontFamily: '"REM"' }}
                  >
                    Admin
                  </Link>
                )}
                <li className="transform rounded-lg bg-teal-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50">
                  <button
                    onClick={handleLogout}
                    style={{ fontFamily: '"REM"' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="relative flex items-center space-x-10">
                <Link
                  to="/login"
                  className="transform rounded-lg bg-teal-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50"
                  style={{ fontFamily: '"REM"' }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="transform rounded-lg bg-teal-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50"
                  style={{ fontFamily: '"REM"' }}
                >
                  Register
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Purchase Cart */}
      <div
        className={`fixed right-0 top-0 z-40 mt-14 h-full w-[30%] transform overflow-y-auto rounded-l-lg bg-teal-950 p-4 shadow-lg transition-transform duration-500 ease-in-out ${showPurchaseCart ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <PurchaseCart user={user} />
      </div>
    </>
  )
}

export default Header
