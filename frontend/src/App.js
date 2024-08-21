import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './services/protectedRoute';
import Layout from './components/Layout/Layout';
import { AudioPlayerProvider } from './components/Layout/ContextAudioPlayer';
// PAGES
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import BeatDetailsPage from './pages/DetailsPage/BeatDetailsPage';
import AdminPage from './pages/AdminPage/AdminPage';
import CreateBeat from './components/Admin/CreateBeat/CreateBeat';
import CreateTag from './components/Admin/CreateTag/CreateTag';
import UserDashboard from './components/Admin/UserDashboard/UserDashboard';

function App() {
  // Define the playTrack function
  const playTrack = (trackUrl) => {
    console.log("Setting track URL:", trackUrl); // Check what track URL is being set

    if (!trackUrl) {
      console.error('No track URL provided');
      return;
    }

    const audio = new Audio(trackUrl);
    audio.addEventListener('error', (event) => {
      console.error('Error playing track:', event);
    });
    audio.play().catch(error => console.error('Error playing track:', error));
  };

  return (
    <AudioPlayerProvider>
      <Router>
        <div className="App">
          <Layout playTrack={playTrack}>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route 
                  path="/beats/:id" 
                  element={<BeatDetailsPage playTrack={playTrack} />} 
                />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                >
                  <Route path="user-dashboard" element={<UserDashboard/>} />
                  <Route path="create-beat" element={<CreateBeat />} />
                  <Route path="create-tag" element={<CreateTag />} />
                </Route>
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </Layout>
        </div>
      </Router>
    </AudioPlayerProvider>
  );
}


export default App;
