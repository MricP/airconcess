import React, { useEffect, useState } from 'react';
import { verifyEmail } from '../../services/auth';
import { Link, useLocation } from 'react-router-dom';

export default function VerifyEmail() {
    const [errorHtml, setErrorHtml] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            const verify = async () => {
                try {
                    const response = await verifyEmail({ token });
                    setResponseMessage(response.message);
                    if (response.message) {
                        setErrorHtml(null);
                    } else {
                        setErrorHtml(response);
                    }
                } catch (error) {
                    console.log('Error response:', error.response?.data?.message);
                    setErrorHtml(error.response?.data?.message || 'Une erreur s\'est produite');
                }
            };
            verify();
        }
    }, [location.search]);

    return (
        <div>
            <h2>Vérifiez votre e-mail</h2>
            <Link to="/sign-in">Se connecter</Link>
            {responseMessage && <p>{responseMessage}</p>}

            {errorHtml && (
                <div
                    dangerouslySetInnerHTML={{ __html: errorHtml }}
                    style={{ color: 'red', marginTop: '20px' }}
                />
            )}
        </div>
    );
}
