// src/App.js
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store' // Redux store
import ProtectedRoute from './services/protectedRoute'
import Layout from './components/Layout/Layout'

import Footer from './components/Footer/Footer'
import ManageBeats from './components/Admin/ManageBeats/ManageBeats'
import ManageTags from './components/Admin/ManageTags/ManageTags'
import ManageUsers from './components/Admin/ManageUsers/ManageUsers'
import ManagePayments from './components/Admin/ManagePayments/ManagePayments'
import ManageLicenses from './components/Admin/ManageLicenses/ManageLicenses'

// Pages
import SupportPage from './pages/SupportPage/SupportPage'
import ContactPage from './pages/ContactPage/ContactPage'
import TermsPage from './pages/TermsPage/TermsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage/PrivacyPolicyPage'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import BeatDetailsPage from './pages/DetailsPage/BeatDetailsPage'
import AdminPage from './pages/AdminPage/AdminPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import PaymentSucessPage from './pages/PaymentSucessPage/PaymentSucessPage'
import PaymentFailedPage from './pages/PaymentFailedPage/PaymentFailedPage'
import PaymentErrorPage from './pages/PaymentErrorPage/PaymentErrorPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // Scrolls to top
  }, [pathname])

  return null
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />

        <Routes>
          {/* Routes without Footer */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Routes with Footer */}
          <Route
            path="/"
            element={
              <>
                <div className="App">
                  <Layout>
                    <HomePage />
                  </Layout>
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/beats/:id"
            element={
              <>
                <div className="App">
                  <Layout>
                    <BeatDetailsPage />
                  </Layout>
                </div>
                <Footer />
              </>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <>
                <ForgotPasswordPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <>
                <ResetPasswordPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/support"
            element={
              <>
                <SupportPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <ContactPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/terms"
            element={
              <>
                <TermsPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/privacy"
            element={
              <>
                <PrivacyPolicyPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <CheckoutPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/success"
            element={
              <>
                <PaymentSucessPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/failed"
            element={
              <>
                <PaymentFailedPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/error"
            element={
              <>
                <PaymentErrorPage />
                <Footer />
              </>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <>
                <div className="App">
                  <ProtectedRoute roles={['admin']}>
                    <Layout>
                      <AdminPage />
                    </Layout>
                  </ProtectedRoute>
                </div>
                <Footer />
              </>
            }
          >
            <Route path="manage-beats" element={<ManageBeats />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-tags" element={<ManageTags />} />
            <Route path="manage-licenses" element={<ManageLicenses />} />
            <Route path="manage-payments" element={<ManagePayments />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
