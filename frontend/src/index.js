import React from 'react'
import ReactDOM from 'react-dom/client' // Updated import
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import './index.css'

// Debug: Log backend URL
console.log('REACT_APP_BACKEND_URL:', process.env.REACT_APP_BACKEND_URL)

const root = ReactDOM.createRoot(document.getElementById('root')) // Use createRoot instead of render

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
