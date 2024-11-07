import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/air-concess/backend/public',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTestMessage = async () => {
  try {
    const response = await axiosInstance.get('/api');
    console.log('Full response:', response); // Log the full response
    console.log('Data fetched:', response.data.message); // Log the message
    return response.data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getCatalogData = async () => {
  try {
    const response = await axiosInstance.get('/catalog');
    console.log('Full response:', response); // Log the full response
    console.log('Data fetched:', response.data.message); // Log the message
    return response.data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};