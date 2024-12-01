import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/air-concess/backend/public/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitAppointment = async (formData) => {
    try {
        const response = await axiosInstance.post('/appointment-submit',formData);    
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const loadTimestamps = async (formData) => {
    try {
        const response = await axiosInstance.post('/appointment-loadTimestamps');    
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const loadAircrafts = async (formData) => {
    try {
        const response = await axiosInstance.post('/appointment-loadAircrafts');    
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};