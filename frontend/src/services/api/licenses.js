/* eslint-disable no-undef */
import axios from 'axios'

// The REACT_APP_BACKEND_URL already includes /api, so we need to remove it or use just the base
const backendBaseUrl = process.env.REACT_APP_BACKEND_URL?.replace('/api', '') || 'http://localhost:3001'

const instance = axios.create({
  baseURL: backendBaseUrl
})

// Get all licenses
export const getLicenses = async () => {
  try {
    console.log('API: Original Backend URL:', process.env.REACT_APP_BACKEND_URL)
    console.log('API: Cleaned Base URL:', backendBaseUrl)
    console.log('API: Instance baseURL:', instance.defaults.baseURL)
    console.log('API: Full URL will be:', `${backendBaseUrl}/api/licenses`)
    
    const response = await instance.get('/api/licenses')
    return response.data
  } catch (error) {
    console.error('Error fetching licenses:', error)
    console.error('Actual request URL:', error.config?.url)
    console.error('Base URL used:', error.config?.baseURL)
    throw error
  }
}

// Get license by ID
export const getLicenseById = async (id) => {
  try {
    const numericId = parseInt(id)
    const response = await instance.get(`/api/licenses/${numericId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching license:', error)
    throw error
  }
}

// Create new license
export const createLicense = async (licenseData) => {
  try {
    console.log('API: Creating license:', licenseData)
    const response = await instance.post('/api/licenses', licenseData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error creating license:', error)
    throw error
  }
}

// Update license
export const updateLicense = async (id, licenseData) => {
  try {
    // Ensure ID is a number (backend expects number)
    const numericId = parseInt(id)
    console.log('API: Updating license with ID:', id, '-> converted to:', numericId)
    console.log('API: License data:', licenseData)
    console.log('API: Full URL:', `${process.env.REACT_APP_BACKEND_URL}/api/licenses/${numericId}`)
    
    const response = await instance.put(`/api/licenses/${numericId}`, licenseData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error updating license:', error)
    console.error('Request URL:', error.config?.url)
    console.error('Request method:', error.config?.method)
    console.error('Response status:', error.response?.status)
    console.error('Response data:', error.response?.data)
    throw error
  }
}

// Delete license
export const deleteLicense = async (id) => {
  try {
    const numericId = parseInt(id)
    console.log('API: Deleting license with ID:', numericId)
    const response = await instance.delete(`/api/licenses/${numericId}`, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error deleting license:', error)
    throw error
  }
}
