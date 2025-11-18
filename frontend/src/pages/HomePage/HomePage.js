import React from 'react'
import FeaturedBeats from '../../components/Beats/FeaturedBeats/FeaturedBeats'
import AvailableBeats from '../../components/Beats/AvailableBeats/AvailableBeats'
import Hero from '../../components/Hero/Hero'
import About from '../../components/About/About'
import '../../styles/page-responsive-pattern.css'

function HomePage() {
  console.log('HomePage: Component mounted')
  return (
    <div className="page-container page-bg-gradient relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1420] via-[#124D82]/20 to-[#0B1420]"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#3876AE]/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-[#3876AE]/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-80 left-1/4 w-1.5 h-1.5 bg-[#3876AE]/25 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-[#3876AE]/35 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-[#3876AE]/20 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3876AE 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <Hero />
      <main className="relative z-10">
        <div id="beats-section" className="page-section">
          <FeaturedBeats />
          <div className="relative">
            {/* Enhanced Available Beats Container */}
            <div className="relative">
              <AvailableBeats />
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#3876AE]/50 rounded-tl-lg"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-[#3876AE]/50 rounded-tr-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-[#3876AE]/50 rounded-bl-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#3876AE]/50 rounded-br-lg"></div>
            </div>
          </div>
        </div>
        <div id="about-section" className="page-section">
          <About />
        </div>
      </main>
    </div>
  )
}

export default HomePage
