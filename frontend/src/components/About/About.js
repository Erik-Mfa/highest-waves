/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef } from 'react'
import { FaPlay } from 'react-icons/fa'

const About = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      // Ensure video plays automatically
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error)
      })
    }
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-900 to-slate-900 p-10 text-white">
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-100"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source 
            src="/assets/studio-footage.mp4" 
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-slate-900/40"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 py-20 lg:flex-row">
        {/* Left side - Text content */}
        <div className="flex-1 space-y-8 p-4 md:p-8">
          <div className="space-y-4">
            <h1
              className="text-5xl font-extrabold tracking-tight md:text-6xl"
              style={{ fontFamily: '"Gantari", sans-serif' }}
            >
              About the Studio
            </h1>
            <div className="h-1 w-24 bg-cyan-500"></div>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl leading-relaxed text-gray-300">
              Highest Waves is a cutting-edge music studio offering top-notch
              services in mixing, production, and composition. Whether you're
              refining your sound or creating something entirely new, Highest Waves
              provides the perfect environment for your music to thrive.
            </p>
            <p className="text-xl leading-relaxed text-gray-300">
              Our collection of premium beats spans across various genres, from trap and drill to melodic rap and R&B. Each beat is crafted with attention to detail and professional-grade quality, ensuring your music stands out.
            </p>
          </div>

        </div>

        {/* Right side - Booking Schedule */}
        <div className="flex-1 p-4 md:p-8">
          <div className="rounded-lg border border-cyan-500/30 bg-black/30 p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-cyan-400">Book a Session</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-4 w-4 border-2 border-cyan-500 mt-1"></div>
                <div>
                  <h3 className="text-lg font-medium text-white">Morning Session</h3>
                  <p className="text-gray-400">9:00 AM - 1:00 PM</p>
                  <p className="text-sm text-gray-500 mt-1">Perfect for vocal recording and mixing</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-4 w-4 border-2 border-teal-500 mt-1"></div>
                <div>
                  <h3 className="text-lg font-medium text-white">Afternoon Session</h3>
                  <p className="text-gray-400">2:00 PM - 6:00 PM</p>
                  <p className="text-sm text-gray-500 mt-1">Ideal for beat production and sound design</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-4 w-4 border-2 border-cyan-500 mt-1"></div>
                <div>
                  <h3 className="text-lg font-medium text-white">Evening Session</h3>
                  <p className="text-gray-400">7:00 PM - 11:00 PM</p>
                  <p className="text-sm text-gray-500 mt-1">Extended time for full production</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-cyan-500/20 pt-6">
              {/* Three CDs with alternating spins */}
              <div className="flex items-center gap-4">
                {/* First CD - Spinning Right */}
                <div className="animate-spin-slow size-8 rounded-full border-2 border-cyan-500 p-1">
                  <div className="size-full rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-transparent">
                    <div className="size-1 rounded-full bg-cyan-400"></div>
                  </div>
                </div>
                
                {/* Second CD - Spinning Left */}
                <div className="animate-spin-reverse-slow size-8 rounded-full border-2 border-teal-500 p-1">
                  <div className="size-full rounded-full border border-teal-500/30 bg-gradient-to-br from-teal-500/20 to-transparent">
                    <div className="size-1 rounded-full bg-teal-400"></div>
                  </div>
                </div>
                
                {/* Third CD - Spinning Left with different color */}
                <div className="animate-spin-reverse-slow size-8 rounded-full border-2 border-emerald-500 p-1">
                  <div className="size-full rounded-full border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-transparent">
                    <div className="size-1 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
              </div>
              
              {/* Booking Info - Right Aligned */}
              <div className="text-right">
                <p className="text-sm text-cyan-400">Available for booking</p>
                <p className="text-xs text-gray-500 mt-1">Contact us to reserve your slot</p>
                <div className="mt-2 flex items-center justify-end gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-400">Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

