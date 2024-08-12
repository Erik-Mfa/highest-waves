import axios from 'axios';
import Cookies from 'universal-cookie';
import {jwtDecode} from "jwt-decode";

const BASE_URL = 'http://localhost:3001';
const cookies = new Cookies();

export const login = async (credentials) => {
  
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
    cookies.set("jwt_authorization", response.data.token, { path: '/', maxAge: 100  });
    return response.data.token;
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
};
export const logout = async () => { 
  try {
      const cookies = new Cookies();
      cookies.remove('jwt_authorization');
      return false; 
    } catch (error) {
      console.error('Logout failed:', error.message);
      throw error;
  }
}

export const register = async (credentials) => {
  
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, credentials);
    cookies.set("jwt_authorization", response.data.token, { path: '/', maxAge: 100  });
    return response.data.token;
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
};

export const isAuthenticated = async () => {
  const cookie = await cookies.get('jwt_authorization');
  if (!cookie) {
    return false; 
  }
  
  try {
    const decoded = jwtDecode(cookie);
    const user = decoded;
    console.log(user)
    return user; 
  } catch (error) {
    console.error('Error decoding JWT token:', error.message);
    return false; 
  }
};

export const isAdmin = async () => {
  const cookie = await cookies.get('jwt_authorization');
  if (!cookie) {
    return false; 
  }
  
  try {
    const decoded = jwtDecode(cookie);
    const admin = decoded.role;
    return !!admin; 
  } catch (error) {
    console.error('Error decoding JWT token:', error.message);
    return false; 
  }
};