import axios from 'axios'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  withCredentials: true
})

const cookies = new Cookies()

const cookieOptions = {
  path: '/',
  maxAge: 86400,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production'
}

export const login = async (credentials) => {
  try {
    const response = await instance.post('/auth/login', credentials)
    cookies.set('jwt_token', response.data.token, cookieOptions)
    return response.data.token
  } catch (error) {
    console.error('LOGIN:', error.message)
    throw error
  }
}

export const register = async (credentials) => {
  try {
    const response = await instance.post('/auth/register', credentials)
    cookies.set('jwt_token', response.data.token, cookieOptions)
    return response.data.token
  } catch (error) {
    console.error('REGISTRATION FAILED:', error.message)
    throw error
  }
}

export const logout = async () => {
  try {
    cookies.remove('jwt_token', cookieOptions)
    window.location.assign('/')
    return false
  } catch (error) {
    console.error('LOGOUT FAILED:', error.message)
    throw error
  }
}

export const isAuthenticated = async () => {
  const cookie = cookies.get('jwt_token')
  console.log('JWT token from cookie:', cookie)

  if (!cookie) {
    return false
  }

  try {
    const decoded = jwtDecode(cookie)
    console.log('Decoded JWT token:', decoded)
    const currentTime = Date.now() / 1000

    if (decoded.exp < currentTime) {
      console.warn('JWT token has expired')
      return false
    }

    return decoded
  } catch (error) {
    console.error('Error decoding JWT token:', error.message)
    return false
  }
}

export const isAdmin = async () => {
  const cookie = cookies.get('jwt_token')

  if (!cookie) {
    return false
  }

  try {
    const decoded = jwtDecode(cookie)
    return decoded.role === 'admin'
  } catch (error) {
    console.error('ERROR DECODING JWT TOKEN:', error.message)
    return false
  }
}
