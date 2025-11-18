// Centralized API configuration
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://highest-waves-backend-647906054947.us-central1.run.app'

console.log('API Backend URL:', BACKEND_URL)

export const API_BASE_URL = `${BACKEND_URL}/api`
export default API_BASE_URL

