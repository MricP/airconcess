import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const signIn = async ({formData}) => {
    try {
        const response = await axiosInstance.post('/sign-in', {
            email: formData.email,
            username : formData.username,
            password: formData.password
        });
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const signUp = async ({ email, username, password, firstName, lastName }) => {
    try {
        const response = await axiosInstance.post('/sign-up', {
            email,
            username,
            password,
            firstName,
            lastName,
        });
        console.log('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
