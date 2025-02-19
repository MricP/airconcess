
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/air-concess/backend/public/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitTraining = async (formData) => {
    try {
        const response = await axiosInstance.post('/subTraining/submit',formData);    
        return response;
    } catch (error) {
        throw error;
    }
};

export const getTrainers = async () => {
  try {
      const response = await axiosInstance.get('/subTraining/get-trainers');    
      return response;
  } catch (error) {
      throw error;
  }
};


