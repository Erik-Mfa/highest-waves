import React from 'react';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-end h-[60vh] bg-cover bg-center text-white" style={{ backgroundImage: "url('/assets/pedro.png')" }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative text-right mr-24">
        <h1 className="text-6xl font-bold" style={{ fontFamily: '"Gupter", serif' }}>Welcome to Highest Waves</h1>
        <p className="text-3xl mb-6">Discover the best beats and sounds</p>
        <button className="bg-orange-600 text-white py-2 px-4 rounded-lg shadow hover:bg-orange-700 transition duration-300" style={{backgroundColor: '#6D8BA6'}}>
          Explore Beats
        </button>
      </div>
    </section>
  );
};

export default Hero;
