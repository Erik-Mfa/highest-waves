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
import ManageBeats from './components/Admin/ManageBeats/ManageBeats';
import ManageTags from './components/Admin/ManageTags/ManageTags';
import ManageUsers from './components/Admin/ManageUsers/ManageUsers';

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
                  <Route path="manage-beats" element={<ManageBeats />} />
                  <Route path="manage-users" element={<ManageUsers />} />
                  <Route path="manage-tags" element={<ManageTags />} />
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
