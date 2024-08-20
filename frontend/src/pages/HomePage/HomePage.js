import {React} from 'react';
import FeaturedBeats from '../../components/Beats/FeaturedBeats/FeaturedBeats';
import AvailableBeats from '../../components/Beats/AvailableBeats/AvailableBeats';
import Hero from '../../components/Hero/Hero'; 
import About from '../../components/About/About'; 
import Footer from '../../components/Footer/Footer'


function HomePage() {
  
  return (
    <div className="home-page">

      <Hero /> 

      <main className="" style={{backgroundColor: '#102D40'}}>
        <div>

          <FeaturedBeats />
          <AvailableBeats />
          <About />
          <Footer />
          
        </div>
        <div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
