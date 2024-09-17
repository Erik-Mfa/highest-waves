import React from 'react';
import FeaturedBeats from '../../components/Beats/FeaturedBeats/FeaturedBeats';
import AvailableBeats from '../../components/Beats/AvailableBeats/AvailableBeats';
import Hero from '../../components/Hero/Hero'; 
import About from '../../components/About/About'; 

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <main className='bg-slate-900'>
        <div id="beats-section">
          <FeaturedBeats />
          <AvailableBeats />
        </div>
        <div id="about-section">
          <About />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
