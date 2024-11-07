import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/myproject/air-concess/backend/public',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTestMessage = async () => {
  try {
    const response = await axiosInstance.get('/api');
    console.log('Full response:', response); 
    console.log('Data fetched:', response.data.message);
    return response.data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
