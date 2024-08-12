import {React, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'; 
import LoginPage from './pages/LoginPage/LoginPage'; 
import RegisterPage from './pages/RegisterPage/RegisterPage'; 
import BeatDetailsPage from './pages/DetailsPage/BeatDetailsPage'; 
import AdminPage from './pages/AdminPage/AdminPage'; 
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import Cookies from 'universal-cookie';

function App() {
  const [checkAdmin, setCheckAdmin] = useState(false)
const [checkAuthenticated, setCheckAuthenticated] = useState(false)

async function authentication(admin, auth) {
    await setCheckAdmin(admin)
    await setCheckAuthenticated(auth)

    console.log("Route page admin: "+ admin)
}

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<HomePage authentication={authentication}/>} />
            <Route path="/beats/:id" element={<BeatDetailsPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" 
              element={
                <ProtectedRoute 
                  isAllowed={checkAdmin} 
                  isAuthenticated={checkAuthenticated}
                  redirectTo='/'> 
                    {/* Admin page rendered after validation */}
                    <AdminPage />
              </ProtectedRoute>
              }
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
