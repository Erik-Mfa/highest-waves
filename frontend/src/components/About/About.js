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
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-slate-900 p-2 text-white sm:p-4 lg:p-10">
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
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-row items-start gap-2 sm:gap-4 lg:gap-12">
        {/* Left side - Text content */}
        <div className="flex-1 space-y-2 p-2 sm:space-y-4 sm:p-4 md:p-6">
          <div className="space-y-2">
            <h1
              className="text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl"
              style={{ fontFamily: '"Gantari", sans-serif' }}
            >
              About the Studio
            </h1>
            <div className="h-0.5 w-12 bg-cyan-500 sm:h-1 sm:w-16"></div>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs leading-relaxed text-gray-300 sm:text-sm lg:text-base">
              Highest Waves is a cutting-edge music studio offering top-notch
              services in mixing, production, and composition. Whether you're
              refining your sound or creating something entirely new, Highest Waves
              provides the perfect environment for your music to thrive.
            </p>
            <p className="text-xs leading-relaxed text-gray-300 sm:text-sm lg:text-base">
              Our collection of premium beats spans across various genres, from trap and drill to melodic rap and R&B. Each beat is crafted with attention to detail and professional-grade quality, ensuring your music stands out.
            </p>
          </div>
        </div>

        {/* Right side - Booking Schedule */}
        <div className="flex-1 p-2 sm:p-4 md:p-6">
          <div className="rounded-lg border border-cyan-500/30 bg-black/30 p-3 backdrop-blur-sm sm:p-4 lg:p-6">
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-base font-semibold text-cyan-400 sm:text-lg lg:text-xl">Book a Session</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 border border-cyan-500 mt-1 sm:h-3 sm:w-3"></div>
                <div>
                  <h3 className="text-xs font-medium text-white sm:text-sm lg:text-base">Morning Session</h3>
                  <p className="text-[10px] text-gray-400 sm:text-xs">9:00 AM - 1:00 PM</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Perfect for vocal recording and mixing</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 border border-teal-500 mt-1 sm:h-3 sm:w-3"></div>
                <div>
                  <h3 className="text-xs font-medium text-white sm:text-sm lg:text-base">Afternoon Session</h3>
                  <p className="text-[10px] text-gray-400 sm:text-xs">2:00 PM - 6:00 PM</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Ideal for beat production and sound design</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 border border-cyan-500 mt-1 sm:h-3 sm:w-3"></div>
                <div>
                  <h3 className="text-xs font-medium text-white sm:text-sm lg:text-base">Evening Session</h3>
                  <p className="text-[10px] text-gray-400 sm:text-xs">7:00 PM - 11:00 PM</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Extended time for full production</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-cyan-500/20 pt-3">
              {/* Three CDs with alternating spins */}
              <div className="flex items-center gap-1.5">
                {/* First CD - Spinning Right */}
                <div className="animate-spin-slow size-4 rounded-full border border-cyan-500 p-0.5 sm:size-6">
                  <div className="size-full rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-transparent">
                    <div className="size-0.5 rounded-full bg-cyan-400"></div>
                  </div>
                </div>
                
                {/* Second CD - Spinning Left */}
                <div className="animate-spin-reverse-slow size-4 rounded-full border border-teal-500 p-0.5 sm:size-6">
                  <div className="size-full rounded-full border border-teal-500/30 bg-gradient-to-br from-teal-500/20 to-transparent">
                    <div className="size-0.5 rounded-full bg-teal-400"></div>
                  </div>
                </div>
                
                {/* Third CD - Spinning Left with different color */}
                <div className="animate-spin-reverse-slow size-4 rounded-full border border-emerald-500 p-0.5 sm:size-6">
                  <div className="size-full rounded-full border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-transparent">
                    <div className="size-0.5 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
              </div>
              
              {/* Booking Info - Right Aligned */}
              <div className="text-right">
                <p className="text-[10px] text-cyan-400 sm:text-xs">Available for booking</p>
                <p className="text-[10px] text-gray-500">Contact us to reserve your slot</p>
                <div className="mt-0.5 flex items-center justify-end gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 sm:h-2 sm:w-2"></div>
                  <span className="text-[10px] text-gray-400 sm:text-xs">Open</span>
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

