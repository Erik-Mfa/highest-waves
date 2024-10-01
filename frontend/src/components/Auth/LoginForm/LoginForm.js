import React, { useState } from 'react';
import { login } from '../../../services/api/auth';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const logged = await login(credentials);

    if(!!logged){
      navigate("/");
      window.location.reload();
    }
  };

  return (

    <div className="flex min-h-screen bg-[#042326]">
      {/* Left side: Form (1/3 of the page) */}
      <div 
        className="w-full md:w-1/3 flex flex-col justify-start mt-20 p-6 bg-[#042326] animate-slide-in-left"
        >
        <div className="w-full p-8 rounded-lg border-2 border-[#0A3A40] shadow-lg">
          <h2 className="text-4xl font-bold text-center text-white mb-8 tracking-wider">
            SIGN IN
          </h2>
          <form>
            <div className="mb-10">
              <label htmlFor="Username" className="block text-sm font-medium text-white">
                Username
              </label>
              <input
                type="text"
                id="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-[#107361] rounded-md shadow-sm bg-[#0A3A40] text-white focus:outline-none focus:ring-[#1D7373] focus:border-[#1D7373] sm:text-sm"
              />
            </div>
  
            <div className="mb-10">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-[#107361] rounded-md shadow-sm bg-[#0A3A40] text-white focus:outline-none focus:ring-[#1D7373] focus:border-[#1D7373] sm:text-sm"
              />
            </div>
  
            <div className="mb-10">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-[#107361] rounded-md shadow-sm bg-[#0A3A40] text-white focus:outline-none focus:ring-[#1D7373] focus:border-[#1D7373] sm:text-sm"
              />
            </div>
  
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-2 px-4 border mt-6 border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gradient-to-r from-[#1D7373] to-[#0F5959] hover:from-[#107361] hover:to-[#0F5959] transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Continue
            </button>
          </form>
  
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">Don't have an account?</p>
            <Link to="/register" className="text-[#1D7373] hover:text-[#107361] font-medium transition-colors duration-200">Register here</Link>
          </div>
        </div>
      </div>
  
      {/* Right side: Background Image (2/3 of the page) */}
      <div className="w-full md:w-2/3 overflow-hidden relative">
        <img 
          src='/assets/rizzo-edits.jpeg'   
          alt="Background" 
          className="w-full h-full object-cover max-h-screen opacity-80"
        />
        {/* Overlay for neon effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#042326] opacity-60"></div>
      </div>
    </div>
  );
};

export default Login;
