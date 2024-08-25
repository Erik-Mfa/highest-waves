import React from 'react';

const Hero = () => {
  return (
    <section 
      className="relative flex items-center justify-end h-[90vh] bg-cover bg-center text-white" 
      style={{ backgroundImage: "url('/assets/rizzo-e-compania.jpeg')", backgroundPosition: "center top" }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative text-right mr-24">
        <h1 className="text-7xl font-bold" style={{ fontFamily: '"Gupter", serif' }}>Welcome to Highest Waves</h1>
        <p className="text-4xl mb-6">Discover the best beats and sounds</p>
      </div>
    </section>
  );
};

export default Hero;
