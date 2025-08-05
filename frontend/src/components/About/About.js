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
    <section 
      className="relative flex min-h-[85vh] flex-col items-center justify-center p-2 text-white sm:p-4 lg:p-10"
      style={{ 
        background: `linear-gradient(to bottom right, var(--brand-black), var(--brand-petroleum))` 
      }}
    >
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
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(to bottom right, rgba(11, 20, 32, 0.4), rgba(14, 41, 71, 0.4))` 
          }}
        ></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-row items-start gap-2 sm:gap-4 lg:gap-12">
        {/* Left side - Text content */}
        <div className="flex-1 space-y-2 p-2 sm:space-y-4 sm:p-4 md:p-6">
          <div className="space-y-2">
            <h1
              className="text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl"
              style={{ 
                fontFamily: '"Gantari", sans-serif',
                color: 'var(--brand-contrast)'
              }}
            >
              About the Studio
            </h1>
            <div 
              className="h-0.5 w-12 sm:h-1 sm:w-16"
              style={{ backgroundColor: 'var(--brand-light)' }}
            ></div>
          </div>
          
          <div className="space-y-2">
            <p 
              className="text-xs leading-relaxed sm:text-sm lg:text-base"
              style={{ color: 'var(--brand-contrast)' }}
            >
              Highest Waves is a cutting-edge music studio offering top-notch
              services in mixing, production, and composition. Whether you're
              refining your sound or creating something entirely new, Highest Waves
              provides the perfect environment for your music to thrive.
            </p>
            <p 
              className="text-xs leading-relaxed sm:text-sm lg:text-base"
              style={{ color: 'var(--brand-contrast)' }}
            >
              Our collection of premium beats spans across various genres, from trap and drill to melodic rap and R&B. Each beat is crafted with attention to detail and professional-grade quality, ensuring your music stands out.
            </p>
          </div>
        </div>

        {/* Right side - Booking Schedule */}
        <div className="flex-1 p-2 sm:p-4 md:p-6">
          <div 
            className="rounded-lg p-3 backdrop-blur-sm sm:p-4 lg:p-6"
            style={{ 
              border: `1px solid rgba(56, 118, 174, 0.3)`,
              backgroundColor: 'rgba(11, 20, 32, 0.3)' 
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <h2 
                className="text-base font-semibold sm:text-lg lg:text-xl"
                style={{ color: 'var(--brand-light)' }}
              >
                Book a Session
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div 
                  className="h-2 w-2 mt-1 sm:h-3 sm:w-3"
                  style={{ border: `1px solid var(--brand-light)` }}
                ></div>
                <div>
                  <h3 
                    className="text-xs font-medium sm:text-sm lg:text-base"
                    style={{ color: 'var(--brand-contrast)' }}
                  >
                    Morning Session
                  </h3>
                  <p 
                    className="text-[10px] sm:text-xs"
                    style={{ color: 'var(--brand-medium)' }}
                  >
                    9:00 AM - 1:00 PM
                  </p>
                  <p 
                    className="text-[10px] mt-0.5"
                    style={{ color: 'var(--brand-petroleum)' }}
                  >
                    Perfect for vocal recording and mixing
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div 
                  className="h-2 w-2 mt-1 sm:h-3 sm:w-3"
                  style={{ border: `1px solid var(--brand-medium)` }}
                ></div>
                <div>
                  <h3 
                    className="text-xs font-medium sm:text-sm lg:text-base"
                    style={{ color: 'var(--brand-contrast)' }}
                  >
                    Afternoon Session
                  </h3>
                  <p 
                    className="text-[10px] sm:text-xs"
                    style={{ color: 'var(--brand-medium)' }}
                  >
                    2:00 PM - 6:00 PM
                  </p>
                  <p 
                    className="text-[10px] mt-0.5"
                    style={{ color: 'var(--brand-petroleum)' }}
                  >
                    Ideal for beat production and sound design
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div 
                  className="h-2 w-2 mt-1 sm:h-3 sm:w-3"
                  style={{ border: `1px solid var(--brand-light)` }}
                ></div>
                <div>
                  <h3 
                    className="text-xs font-medium sm:text-sm lg:text-base"
                    style={{ color: 'var(--brand-contrast)' }}
                  >
                    Evening Session
                  </h3>
                  <p 
                    className="text-[10px] sm:text-xs"
                    style={{ color: 'var(--brand-medium)' }}
                  >
                    7:00 PM - 11:00 PM
                  </p>
                  <p 
                    className="text-[10px] mt-0.5"
                    style={{ color: 'var(--brand-petroleum)' }}
                  >
                    Extended time for full production
                  </p>
                </div>
              </div>
            </div>
            <div 
              className="mt-3 flex items-center justify-between pt-3"
              style={{ borderTop: `1px solid rgba(56, 118, 174, 0.2)` }}
            >
              {/* Three CDs with alternating spins */}
              <div className="flex items-center gap-1.5">
                {/* First CD - Spinning Right */}
                <div 
                  className="animate-spin-slow size-4 rounded-full p-0.5 sm:size-6"
                  style={{ border: `1px solid var(--brand-light)` }}
                >
                  <div 
                    className="size-full rounded-full"
                    style={{ 
                      border: `1px solid rgba(56, 118, 174, 0.3)`,
                      background: `linear-gradient(to bottom right, rgba(56, 118, 174, 0.2), transparent)` 
                    }}
                  >
                    <div 
                      className="size-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--brand-light)' }}
                    ></div>
                  </div>
                </div>
                
                {/* Second CD - Spinning Left */}
                <div 
                  className="animate-spin-reverse-slow size-4 rounded-full p-0.5 sm:size-6"
                  style={{ border: `1px solid var(--brand-medium)` }}
                >
                  <div 
                    className="size-full rounded-full"
                    style={{ 
                      border: `1px solid rgba(18, 77, 130, 0.3)`,
                      background: `linear-gradient(to bottom right, rgba(18, 77, 130, 0.2), transparent)` 
                    }}
                  >
                    <div 
                      className="size-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--brand-medium)' }}
                    ></div>
                  </div>
                </div>
                
                {/* Third CD - Spinning Left with different color */}
                <div 
                  className="animate-spin-reverse-slow size-4 rounded-full p-0.5 sm:size-6"
                  style={{ border: `1px solid var(--brand-petroleum)` }}
                >
                  <div 
                    className="size-full rounded-full"
                    style={{ 
                      border: `1px solid rgba(14, 41, 71, 0.3)`,
                      background: `linear-gradient(to bottom right, rgba(14, 41, 71, 0.2), transparent)` 
                    }}
                  >
                    <div 
                      className="size-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--brand-petroleum)' }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Booking Info - Right Aligned */}
              <div className="text-right">
                <p 
                  className="text-[10px] sm:text-xs"
                  style={{ color: 'var(--brand-light)' }}
                >
                  Available for booking
                </p>
                <p 
                  className="text-[10px]"
                  style={{ color: 'var(--brand-petroleum)' }}
                >
                  Contact us to reserve your slot
                </p>
                <div className="mt-0.5 flex items-center justify-end gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 sm:h-2 sm:w-2"></div>
                  <span 
                    className="text-[10px] sm:text-xs"
                    style={{ color: 'var(--brand-medium)' }}
                  >
                    Open
                  </span>
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

