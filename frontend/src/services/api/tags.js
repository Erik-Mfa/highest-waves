/* eslint-disable no-undef */
import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`
})

// Create a tag
export const createTag = async (tagDetails) => {
  try {
    const response = await instance.post('/tags', tagDetails, {
      headers: {
        'Content-Type': 'application/json' // Assuming tag data is simple JSON
      },
      withCredentials: true // Handle cookies for authentication
    })
    return response.data
  } catch (error) {
    console.error(
      'Error creating tag:',
      error.response ? error.response.data : error.message
    )
    return { success: false }
  }
}

// Get all tags
export const getTags = async () => {
  try {
    const response = await instance.get('/tags')
    return response.data
  } catch (error) {
    console.error('Error fetching tags:', error)
    return { success: false, error }
  }
}

// Get tag by ID
export const getTagById = async (tagId) => {
  try {
    const response = await instance.get(`/tags/${tagId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching tag details:', error)
    throw error
  }
}

// Delete a tag
export const deleteTag = async (tagId) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await instance.delete(`/tags/${tagId}`, {
      withCredentials: true
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting tag:', error)
    return { success: false, error }
  }
}

// Update a tag
export const updateTag = async (tagId, tagDetails) => {
  try {
    const response = await instance.put(`/tags/${tagId}`, tagDetails, {
      headers: {
        'Content-Type': 'application/json' // Assuming simple JSON data
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error updating tag:', error)
    return { success: false, error }
  }
}
