// catalog

import axios from 'axios';

const adminInstance = axios.create({
    baseURL: 'http://localhost/air-concess/backend/public/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createAircraft = async ({model,isAvailable,planeImg,serialNumber,price,year,hour,capacity,autonomy,description,aircraftType}) => {
    try {
        console.log(model,serialNumber,planeImg,price,year,hour,capacity,autonomy,aircraftType,description,isAvailable);
        const response = await adminInstance.post('/admin/create-aircraft', {
            model,
            serialNumber,
            planeImg,
            price,
            year,
            hour,
            capacity,
            autonomy,
            aircraftType,
            description,
            isAvailable
        });
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};