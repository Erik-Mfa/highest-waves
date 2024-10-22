/* eslint-disable no-undef */
import axios from 'axios'
import { isAuthenticated } from './auth'

const beatOwner = await isAuthenticated()

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`
})

export const createBeat = async (beatDetails) => {
  try {
    beatDetails.owner = beatOwner.userId
    const response = await instance.post('/beats', beatDetails, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error creating beat:', error)
    return { success: false, error }
  }
}

export const getBeats = async () => {
  try {
    const response = await instance.get('/beats') // Adjust the endpoint
    return response.data
  } catch (error) {
    console.error('Error fetching featured beats:', error)
  }
}

export const getBeatById = async (beatId) => {
  try {
    const response = await instance.get(`/beats/${beatId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching beat details:', error)
    throw error // Rethrow the error so it can be handled in the component
  }
}

export const deleteBeat = async (beatId) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await instance.delete(`/beats/${beatId}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting beat:', error)
    return { success: false, error }
  }
}

export const updateBeat = async (beatId, beatDetails) => {
  try {
    beatDetails.owner = beatOwner.userId // Ensure the owner is set
    const response = await instance.put(`/beats/${beatId}`, beatDetails, {
      headers: {
        'Content-Type': 'multipart/form-data' // In case you are updating files
      },
      withCredentials: true // To handle cookies for authentication
    })
    return response.data
  } catch (error) {
    console.error('Error updating beat:', error)
    return { success: false, error } // Return error information to handle it in the component
  }
}
