import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/', 
});

export const createTag = async (tagDetails) => {
  try {
    const response = await instance.post('/tags', tagDetails, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error creating tag:", error.response ? error.response.data : error.message);
    return { success: false };
  }
};

export const getTags = async () => {
  try {
    const response = await instance.get('/tags'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching featured tags:', error);
  }
};