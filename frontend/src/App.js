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
        <ScrollToTop /> {/* Add this line here */}
        <div className="App">
          <Routes>
            {/* Routes that use the main layout */}
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />

            <Route
              path="/beats/:id"
              element={
                <Layout>
                  <BeatDetailsPage />
                </Layout>
              }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />

            <Route path="/support" element={<SupportPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />

            {/* Protected Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin']}>
                  <Layout>
                    <AdminPage />
                  </Layout>
                </ProtectedRoute>
              }
            >
              <Route path="manage-beats" element={<ManageBeats />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="manage-tags" element={<ManageTags />} />
              <Route path="manage-payments" element={<ManagePayments />} />
            </Route>

            {/* Payment page with Checkout Layout */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<PaymentSucessPage />} />
            <Route path="/failed" element={<PaymentFailedPage />} />
            <Route path="/error" element={<PaymentErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
