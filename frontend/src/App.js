import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store'; // Make sure this path is correct
import ProtectedRoute from './services/protectedRoute';
import Layout from './components/Layout/Layout';
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
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Layout>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/beats/:id" element={<BeatDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                >
                  <Route path="user-dashboard" element={<UserDashboard />} />
                  <Route path="create-beat" element={<CreateBeat />} />
                  <Route path="create-tag" element={<CreateTag />} />
                </Route>
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
