import React, { useState } from 'react';
import { signUp } from '../../services/auth';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        password2: "",
        firstName: "",
        lastName: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signUp({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName
            });
            console.log('Data posted with success:', response.success);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder='albertDupond@example.com' onChange={handleChange} />
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder='albertDupond12' onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder='********' onChange={handleChange} />
            <label htmlFor="password2">Password2</label>
            <input type="password" name="password2" id="password2" placeholder='********' onChange={handleChange} />
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" placeholder='Albert' onChange={handleChange} />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" placeholder='Dupond' onChange={handleChange} />
            <button type="submit">Envoyer</button>
        </form>
    );
}
