import {React} from 'react';
import FeaturedBeats from '../../components/FeaturedBeats/FeaturedBeats';
import AvailableBeats from '../../components/AvailableBeats/AvailableBeats';
import Hero from '../../components/Hero/Hero'; 


function HomePage() {
  
  return (
    <div className="home-page">

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
