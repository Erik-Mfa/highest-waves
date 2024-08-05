import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/', // Update this with your backend base URL
});

export default instance;