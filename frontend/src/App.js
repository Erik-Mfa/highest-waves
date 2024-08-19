import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './services/protectedRoute';
import Layout from './components/Layout/Layout';
// PAGES
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import BeatDetailsPage from './pages/DetailsPage/BeatDetailsPage';
import AdminPage from './pages/AdminPage/AdminPage';
import CreateBeat from './components/Admin/CreateBeat/CreateBeat';
import AudioPlayer from './components/Beats/AudioPlayer/AudioPlayer';

function App() {
  

  return (
    <Router>
      <div className="App">
        <Layout>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/beats/:id" element={<BeatDetailsPage  />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                      path="/admin" 
                      element={
                      <ProtectedRoute roles={['admin']}> 
                          <AdminPage /> 
                      </ProtectedRoute>}>

                      <Route path="create" element={<CreateBeat />} />
              </Route>
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </Layout>
      </div>
    </Router>
  );
}

export default App;