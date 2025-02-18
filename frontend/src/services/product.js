import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://46.101.169.59/public/api.php',
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
        const response = await axiosInstance.post('/product/get-aircraftWithId',idAircraft);
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

export const insertAircraft = async (idModel, serialNumber, manufactureYear, flightHours, configuration, recentMaintenance, typicalRoutes, owner, costPerKm, monthlyMaintenanceCost, estimatedPrice, isAvailable, description) => {
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
            isAvailable,
            description
        });
        return response.data
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

export const insertModel = async (modelName, rangeType, manufacturer, passengerCapacity, engines, speedAvg, maxRange, maxAltitude, crewSize, length, wingspan, height, maxTakeoffWeight) => {
    try {
        const response = await axiosInstance.post('/admin/insert-Model', {
            modelName,
            rangeType,
            manufacturer,
            passengerCapacity,
            engines,
            speedAvg,
            maxRange,
            maxAltitude,
            crewSize,
            length,
            wingspan,
            height,
            maxTakeoffWeight
        });
        return response.data
    } catch(error) {
        console.error("Erreur lors de l'insertion", error);
        throw error;
    }
}

export const uploadImage = async (file, directionDir, aircraftId) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // Ajouter le fichier
        formData.append('destinationDir', directionDir); // Ajouter le dossier de destination
        formData.append('aircraftId', aircraftId);

        const response = await axiosInstance.post('/admin/post-uploadImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Nécessaire pour transmettre les fichiers
            },
        });

        // Accéder aux données de la réponse
        const data = response.data;

        return data; // Retourner les données pour une utilisation ultérieure
    } catch (error) {
        console.error("Erreur lors de l'insertion d'une image", error);
        throw error;
    }
};

export const insertImage = async (role, aircraftId, url) => {
    try {
        const response = await axiosInstance.post('/admin/insert-Image', {
            role,
            aircraftId,
            url
        });
        return response.data
    } catch(error) {
        console.error("Erreur lors de l'insertion", error);
        throw error;
    }
}

export const getAircraftBySerialNumber = async (serialNumber) => {
    try {
        const response = await axiosInstance.post('/admin/get-AircraftBySerialNumber', { serialNumber });
        return response.data; 
    } catch (error) {
        console.error("Erreur lors de l'insertion", error);
        throw error;
    }
}

export const deleteAircraft = async (id, nameModel) => {
    try {
        const response = await axiosInstance.post('/admin/delete-Aircraft', { id, nameModel });
        return response
    } catch (error) {
        console.error("Erreur lors de la suppression", error);
        throw error;
    }
}

export const deleteModel = async (id, nameModel) => {
    try {
        const response = await axiosInstance.post('/admin/delete-Model', { id, nameModel });
        return response
    } catch (error) {
        console.error("Erreur lors de la suppression", error);
        throw error;
    }
}