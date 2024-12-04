import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost/air-concess/backend/public/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getIcon = async (id) => {
    try {
        const response = await axiosInstance.post('/product/get-icon',{id});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getMainImage = async (id) => {
    try {
        const response = await axiosInstance.post('/product/get-mainImg',{id});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getSliderImages = async (id) => {
    try {
        const response = await axiosInstance.post('/product/get-sliderImgs',{id});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}