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
      className="relative flex h-[95vh] items-center justify-end bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/assets/rizzo-e-compania.jpeg')",
        backgroundPosition: 'center top'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative mr-24 text-right">
        <h1 className="bg-gradient-to-r bg-clip-text text-7xl font-bold tracking-[0.2em] text-white">
          Welcome to Highest Waves
        </h1>
        <p className="mb-6 text-4xl tracking-widest">
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
