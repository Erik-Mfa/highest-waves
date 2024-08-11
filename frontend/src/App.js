import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'; 
import BeatDetailsPage from './pages/DetailsPage/BeatDetailsPage'; 


function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/beats/:id" element={<BeatDetailsPage/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
