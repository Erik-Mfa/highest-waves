// ./services/beat.js
import axios from 'axios';
import {isAuthenticated} from './auth';

const beatOwner = await isAuthenticated();

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/', // Ensure this is correct
});

export const createBeat = async (beatDetails) => {
    try {
      beatDetails.owner = beatOwner.userId
      const response = await instance.post('/beats', beatDetails, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating beat:", error);
      return { success: false, error };
    }
  };
  
  export const getBeats = async () => {
    try {
      const response = await instance.get('/beats'); // Adjust the endpoint
      return response.data;
    } catch (error) {
      console.error('Error fetching featured beats:', error);
    }
  };
