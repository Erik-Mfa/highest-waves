import React from 'react';
import Header from '../../components/Header/Header';
import BeatList from '../../components/BeatList/BeatList';
import Hero from '../../components/Hero/Hero'; // Import the Hero component
import FeaturedBeats from '../../components/FeaturedBeats/FeaturedBeats';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Hero /> {/* Add the Hero component here */}
      <main className="" style={{backgroundColor: '#102D40'}}>
        <div>
          <FeaturedBeats />
          <BeatList />
        </div>
        <div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
