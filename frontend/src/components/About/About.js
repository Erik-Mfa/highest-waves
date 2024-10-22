/* eslint-disable react/no-unescaped-entities */
import React from 'react'

const About = () => {
  return (
    <section
      className="flex h-auto flex-col items-center bg-cover bg-center p-10 text-white md:h-[80vh] md:flex-row"
      style={{ backgroundImage: "url('/assets/teclado.jpeg')" }}
    >
      {/* Text on the left */}
      <div className="flex-1 p-4 md:p-8">
        <h1
          className="mb-4 text-4xl font-extrabold md:text-5xl"
          style={{ fontFamily: '"Gantari", sans-serif' }}
        >
          About the Studio
        </h1>
        <p className="mb-6 text-lg leading-relaxed md:text-xl">
          Highest Waves is a cutting-edge music studio offering top-notch
          services in mixing, production, and composition. Whether you're
          refining your sound or creating something entirely new, Highest Waves
          provides the perfect environment for your music to thrive.
        </p>
        <button className="rounded-full bg-sky-400 px-8 py-3 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:from-[#5A7491] hover:to-[#6D8BA6] focus:outline-none focus:ring-2 focus:ring-[#5A7491]">
          Explore Beats
        </button>
      </div>

      {/* Image on the right */}
      <div className="flex flex-1 justify-center p-4 md:p-8">
        <img
          src="/assets/rizzo-tocando.jpeg"
          alt="Highest Waves Logo"
          className="h-auto max-h-[450px] w-full max-w-lg rounded-lg object-cover shadow-lg"
        />
      </div>
    </section>
  )
}

export default About
