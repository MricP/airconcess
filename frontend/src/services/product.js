import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost/air-concess/backend/public/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Catalog Page

export const getIcon = async (id) => {
    try {
        const response = await axiosInstance.post('/product/get-icon',{id});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Product Page

export const getAircraft = async (idAircraft) => {
    try {
        const response = await axiosInstance.post('/product/get-aircraftWithId',{idAircraft});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getModelName = async (idAircraft) => {
    try {
        const response = await axiosInstance.post('/product/get-modelName',{idAircraft});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getMainImage = async (idAircraft) => {
    try {
        const response = await axiosInstance.post('/product/get-mainImg',{idAircraft});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getSliderImages = async (idAircraft) => {
    try {
        const response = await axiosInstance.post('/product/get-sliderImgs',{idAircraft});
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getModelDescription = async (idAircraft) => {
    try {
        const response = await axiosInstance.post('/product/get-modelDescription',{idAircraft})
        return response.data;
    } catch(error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getAircraftDescription = async (idAircraft) => {
    try {
        const response = await axiosInstance.post('/product/get-aircraftDescription',{idAircraft})
        return response.data;
    } catch(error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const insertAircraft = async (idModel, serialNumber, manufactureYear, flightHours, configuration, recentMaintenance, typicalRoutes, owner, costPerKm, monthlyMaintenanceCost, estimatedPrice, isAvailable) => {
    try {
        const response = await axiosInstance.post('/admin/insert-Aircraft', {
            idModel,
            serialNumber,
            manufactureYear: parseInt(manufactureYear), 
            flightHours,
            configuration,
            recentMaintenance,
            typicalRoutes,
            owner,
            costPerKm,
            monthlyMaintenanceCost,
            estimatedPrice,
            isAvailable
        });
        console.log('Réponse du serveur:', response);
    } catch(error) {
        console.error("Erreur lors de l'insertion", error);
        throw error;
    }
}

export const getAllModel = async () => {
    try {
        const response = await axiosInstance.post('/admin/get-Model', {});
        return response
    } catch(error) {
        console.error("Erreur lors de l'insertion", error);
        throw error;
    }
}

export const getModelByName = async (nameModel) => {
    try {
        const response = await axiosInstance.post('/admin/get-ByNameModel', { nameModel });
        return response.data; 
    } catch (error) {
        console.error("Erreur lors de l'insertion", error);
        throw error;
    }
}
