import axios from 'axios';
import Cookies from 'universal-cookie';
import {jwtDecode} from "jwt-decode";

const BASE_URL = 'http://localhost:3001';
const cookies = new Cookies();

export const login = async (credentials) => {
  
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
    cookies.set("jwt_token", response.data.token, { path: '/', maxAge: 7200  });
    return response.data.token;
  } catch (error) {
    console.error('LOGIN:', error.message);
    throw error;
  }

};

export const register = async (credentials) => {
  
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, credentials);
    cookies.set("jwt_token", response.data.token, { path: '/', maxAge: 7200  });
    
    return response.data.token;
  } catch (error) {
    console.error('REGISTRATION FAILED:', error.message);
    throw error;
  }

};

export const logout = async () => { 

  try {
      const cookies = new Cookies();
      cookies.remove('jwt_token');
      return false; 
    } catch (error) {
      console.error('LOGOUT FAILED:', error.message);
      throw error;
  }

}

//ALWAYS RETRIEVE THE USER FROM THE TOKEN
export const isAuthenticated = async () => {
  const cookie = await cookies.get('jwt_token');
 
  if (!cookie) {
    return false; 
  }
  
  try {
    const decoded = jwtDecode(cookie);
    const user = decoded;

    console.log("USER TABLE FRONTEND:")
    console.table(user)

    return user; 
  } catch (error) {
    console.error('ERROR DECODING JWT TOKEN:', error.message);
    return false; 
  }

};

export const isAdmin = async () => {
  const cookie = await cookies.get('jwt_token');

  if (!cookie) {
    return false; 
  }
  
  try {
    const decoded = jwtDecode(cookie);
    const admin = decoded.role;
    return !!admin; 
  } catch (error) {
    console.error('ERROR DECODING JWT TOKEN:', error.message);
    return false; 
  }

};