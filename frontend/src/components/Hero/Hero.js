import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaChevronDown } from 'react-icons/fa'

const Hero = () => {
  const navigate = useNavigate()

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
    <section
      className="relative flex h-[95vh] items-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/assets/rizzo-e-compania.jpeg')",
        backgroundPosition: 'center top'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative w-full px-6 sm:px-12 lg:ml-24">
        <h1 className="max-w-[12ch] text-7xl font-bold tracking-wide sm:text-8xl lg:text-9xl">
          <span className="text-white">Welcome to</span><br />
          <span className="text-cyan-500">Highest Waves</span>
        </h1>
        <p className="mt-6 text-4xl tracking-wide text-gray-100 sm:text-5xl lg:text-6xl">
          Discover the best beats and sounds
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ul>
          <li className="text-xl text-white transition-transform duration-200 hover:scale-110 hover:bg-opacity-70">
            <button onClick={() => handleNavigation('/', 'beats-section')}>
              <FaChevronDown size={24} />
            </button>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-10 left-5 flex space-x-4">
        <a
          href="https://www.instagram.com/highestwavess/"
          className="text-white hover:text-fuchsia-600"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://twitter.com"
          className="text-white hover:text-teal-500"
        >
          <FaTwitter size={24} />
        </a>
      </div>
    </section>
  )
}

export default Hero
