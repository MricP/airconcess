import axios from 'axios';

const authInstance = axios.create({
    baseURL: 'http://localhost/air-concess/backend/public/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const signIn = async ({ email, password }) => {
    try {
        console.log({ email, password });
        const response = await authInstance.post('/auth/sign-in', {
            email,
            password
        });
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const signUp = async ({ email, password, passwordConfirmation, firstName, lastName }) => {
    try {
        console.log({ email, password, passwordConfirmation, firstName, lastName });
        const response = await authInstance.post('/auth/sign-up', {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            first_name: firstName,
            last_name: lastName,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const verifyEmail = async ({ token }) => {
    try {
        const response = await authInstance.post('/auth/verify-email', {
            token,
        });
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const resetPassword = async ({ token, new_password }) => {
    try {
        const response = await authInstance.post('/auth/reset-password', {
            new_password,
            token,
        });
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const resetPasswordRequest = async (email) => {
    try {
        const response = await authInstance.post('/auth/reset-password-request', {
            email,
        });
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


export const getUserData = async (token) => {
    try {
        const response = await authInstance.get('/auth/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const updateUserData = async (data, token) => {
    try {
        const response = await authInstance.put('/auth/user', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const updateProfileData = async (data,token) => {
    try {
        const response = await authInstance.put('/my-profile', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Data fetched for profile update:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const deleteProfilData = async (token) => {
    try {
        const response = await authInstance.delete('/my-profile/delete', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Data fetched for profile update:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const changeProfilePicture = async (token, data) => {
    try {
        const formData = new FormData();
        formData.append('image', data); 
        
        const response = await authInstance.post('/my-profile/change-picture', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        console.log('Fichier post:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l’envoi des données:', error);
        throw error;
    }
};


export const postTest = async ({ content }) => {
    try {
        const response = await authInstance.post('/auth/test', {
            content,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}