import React from 'react';
import Header from '../../components/Header/Header';
// import BeatList from '../../components/AvailableBeats/BeatList/BeatList';
import AvailableBeats from '../../components/AvailableBeats/AvailableBeats';
import Hero from '../../components/Hero/Hero'; 
import FeaturedBeats from '../../components/FeaturedBeats/FeaturedBeats';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Hero /> 
      <main className="" style={{backgroundColor: '#102D40'}}>
        <div>
          <FeaturedBeats />
          <AvailableBeats />
        </div>
        <div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
