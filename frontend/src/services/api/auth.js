import axios from 'axios';
import Cookies from 'universal-cookie';
import {jwtDecode} from "jwt-decode";

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/', // Ensure this is correct
});

const cookies = new Cookies();

export const login = async (credentials) => {
  
  try {
    const response = await instance.post('/auth/login', credentials);
    cookies.set("jwt_token", response.data.token, { path: '/', maxAge: 86400  });
    return response.data.token;
  } catch (error) {
    console.error('LOGIN:', error.message);
    throw error;
  }

};

export const register = async (credentials) => {
  
  try {
    const response = await instance.post('/auth/register', credentials);
    cookies.set("jwt_token", response.data.token, { path: '/', maxAge: 86400  });
    
    return response.data.token;
  } catch (error) {
    console.error('REGISTRATION FAILED:', error.message);
    throw error;
  }

};

export const logout = async () => { 

  try {
      const cookies = new Cookies();
      cookies.remove('jwt_token', { path: '/' });

      window.location.assign('/');
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