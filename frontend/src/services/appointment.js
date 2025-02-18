import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://airconcess.org/public/api',
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

export const loadTimestamps = async (agency_id) => {
    try {
        const response = await axiosInstance.post('/appointment-loadTimestamps',agency_id);    
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const loadModels = async () => {
    try {
        const response = await axiosInstance.post('/appointment-loadModels');    
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const loadAgencies = async () => {
    try {
        const response = await axiosInstance.post('/appointment-loadAgencies');    
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const loadAgencyLocation = async (agency_id) => {
    try {
        const response = await axiosInstance.post('/appointment-loadAgencyLocation',agency_id);    
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const loadAircraftsOfModel = async (model_id) => {
    try {
        const response = await axiosInstance.post('/appointment-loadAircrafts',model_id);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const loadAircraft = async (aircraft_id) => {
    try {
        const response = await axiosInstance.post('/appointment-loadAircraftWithId',aircraft_id);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getAppointmentByUser = async (token) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get('/profile/get-appointment-user', {
            headers: {
                'Authorization': `Bearer ${token}`, // Vérifiez que le préfixe "Bearer " est présent
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};