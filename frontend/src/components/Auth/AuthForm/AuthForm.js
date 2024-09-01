import React, { useState } from 'react';
import { login } from '../../../services/api/auth';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const logged = await login(credentials);

    if(!!logged){
      console.log("logged: " + logged);
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side: Form (1/3 of the page) */}
      <div className="w-full md:w-1/3 flex flex-col justify-start p-6 bg-gray-800">
        <div className="w-full p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Sign In</h2>
          <form>
            <div className="mb-6">
              <label htmlFor="Username" className="block text-sm font-medium text-white">Username</label>
              <input
                type="text"
                id="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
  
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-white">E-mail</label>
              <input
                type="email"
                id="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
  
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
  
            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-2 px-4 border mt-6 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Continue
            </button>
          </form>
  
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <Link to="/register" className="text-cyan-500 hover:text-cyan-600 font-medium">Register here</Link>
          </div>
        </div>
      </div>
  
      {/* Right side: Background Image (2/3 of the page) */}
      <div className="w-full md:w-2/3 overflow-hidden">
        <img 
          src='/assets/rizzo-edits.jpeg'   
          alt="Background" 
          className="w-full h-full object-cover max-h-screen" 
        />
      </div>
    </div>
  );
  
  
};

export default Login;
