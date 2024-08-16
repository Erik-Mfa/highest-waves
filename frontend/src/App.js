import { React} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './services/protectedRoute';
//PAGES
import HomePage from './pages/HomePage/HomePage'; 
import LoginPage from './pages/LoginPage/LoginPage'; 
import RegisterPage from './pages/RegisterPage/RegisterPage'; 
import BeatDetailsPage from './pages/DetailsPage/BeatDetailsPage'; 
import AdminPage from './pages/AdminPage/AdminPage'; 

function App() {
  return (
    <Router>

      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<HomePage/>} />

            <Route path="/beats/:id" element={<BeatDetailsPage/>} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/admin" 
              element={
                <ProtectedRoute 
                  element={<ProtectedRoute component={AdminPage} roles={['admin']} />}
                />
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
