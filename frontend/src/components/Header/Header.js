import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaShoppingCart, FaMusic, FaBars, FaTimes } from 'react-icons/fa'
import { logout } from '../../services/api/auth'
import PurchaseCart from '../PurchaseCart/PurchaseCart'
import './Header.css'

const Header = ({ user, admin }) => {
  const [showPurchaseCart, setShowPurchaseCart] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const success = await logout()
      if (success) {
        navigate('/')
        setIsMobileMenuOpen(false)
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
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Header */}
      <header className="shadow-header-shadow fixed left-0 top-0 z-50 w-full border-b-2 border-teal-950 bg-gray-900 text-white">
        <nav className="relative flex items-center justify-between px-4 py-2 sm:px-6 lg:px-12">
          {/* Logo */}
          <Link to="/" className="z-10">
            <img
              src="/assets/highestwaves-logo.png"
              alt="Highest Waves Logo"
              className="w-20 transition-transform duration-200 hover:scale-105 sm:w-24 lg:w-28"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center space-x-8 lg:flex">
            <li className="text-lg text-white transition-transform duration-200 hover:scale-110">
              <button
                onClick={() => handleNavigation('/', 'beats-section')}
                className="flex items-center font-rem"
              >
                <FaMusic className="mr-2" />
                Explore
              </button>
            </li>
            <li className="text-lg text-white transition-transform duration-200 hover:scale-110">
              <button
                onClick={() => handleNavigation('/', 'about-section')}
                className="font-rem"
              >
                About
              </button>
            </li>
          </ul>

          {/* Desktop Right Side */}
          <ul className="hidden items-center space-x-6 lg:flex">
            <li>
              <button
                onClick={() => setShowPurchaseCart((prev) => !prev)}
                className="flex items-center text-lg text-white transition-transform duration-200 hover:scale-110"
              >
                <FaShoppingCart size={24} />
              </button>
            </li>

            {user ? (
              <>
                <li className="text-lg text-white">
                  <span className="font-rem">Welcome, {user.username}!</span>
                </li>
                {admin && (
                  <Link
                    className="transform rounded-lg bg-teal-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 font-rem"
                    to="/admin"
                  >
                    Admin
                  </Link>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="transform rounded-lg bg-teal-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 font-rem"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="transform rounded-lg bg-teal-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 font-rem"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="transform rounded-lg bg-teal-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 font-rem"
                >
                  Register
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              onClick={() => setShowPurchaseCart((prev) => !prev)}
              className="text-white"
            >
              <FaShoppingCart size={24} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FaTimes size={24} />
              ) : (
                <FaBars size={24} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex h-full flex-col items-center justify-center space-y-8 p-4">
              <button
                onClick={() => handleNavigation('/', 'beats-section')}
                className="flex items-center text-xl text-white transition-transform duration-200 hover:scale-110 font-rem"
              >
                <FaMusic className="mr-2" />
                Explore
              </button>
              <button
                onClick={() => handleNavigation('/', 'about-section')}
                className="text-xl text-white transition-transform duration-200 hover:scale-110 font-rem"
              >
                About
              </button>

              {user ? (
                <>
                  <span className="text-xl text-white font-rem">
                    Welcome, {user.username}!
                  </span>
                  {admin && (
                    <Link
                      to="/admin"
                      className="transform rounded-lg bg-teal-800 px-6 py-2 text-xl text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 font-rem"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="transform rounded-lg bg-teal-800 px-6 py-2 text-xl text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 font-rem"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link
                    to="/login"
                    className="transform rounded-lg bg-teal-800 px-6 py-2 text-xl text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 font-rem"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="transform rounded-lg bg-teal-800 px-6 py-2 text-xl text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 font-rem"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Purchase Cart */}
      <div
        className={`fixed right-0 top-0 z-40 mt-14 h-full w-full transform overflow-y-auto rounded-l-lg bg-teal-950 p-4 shadow-lg transition-transform duration-500 ease-in-out sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] ${
          showPurchaseCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <PurchaseCart user={user} />
      </div>
    </>
  )
}

export default Header
