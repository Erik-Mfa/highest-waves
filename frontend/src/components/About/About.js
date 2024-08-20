import React from 'react';

const About = () => {
  return (
    <section className="flex flex-col md:flex-row items-center h-auto md:h-[80vh] p-10 bg-cover bg-center text-white" style={{ backgroundImage: "url('/assets/teclado.jpeg')" }}>
      
      {/* Text on the left */}
      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: '"Gantari", sans-serif' }}>About the Studio</h1>
        <p className="text-lg md:text-xl mb-6 leading-relaxed">
          Highest Waves is a cutting-edge music studio offering top-notch services in mixing, production, and composition. 
          Whether you're refining your sound or creating something entirely new, Highest Waves provides the perfect environment for your music to thrive.
        </p>
        <button className="text-white bg-sky-400 py-3 px-8 rounded-full shadow-lg hover:from-[#5A7491] hover:to-[#6D8BA6] transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#5A7491]">
          Explore Beats
        </button>
      </div>

      {/* Image on the right */}
      <div className="flex-1 p-4 md:p-8 flex justify-center">
        <img 
          src='/assets/rizzo-tocando.jpeg' 
          alt='Highest Waves Logo' 
          className="w-full max-w-lg max-h-[450px] h-auto rounded-lg shadow-lg object-cover" 
        />
      </div>

    </section>
  );
};

export default About;
