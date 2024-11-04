import React, { useState } from 'react';
import { resetPasswordRequest } from '../../services/auth';

export default function ResetPasswordRequest() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorHtml, setErrorHtml] = useState(null);

    const handleResetPassword = async () => {
        try {
            const response = await resetPasswordRequest({ email });
            if (response.message) {
                setMessage('Password reset link has been sent to your email.');
                setErrorHtml(null);
            } else {
                setErrorHtml(response);
            }
        } catch (error) {
            console.log('Error response:', error.response.data.message);
            setErrorHtml(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleResetPassword}>Reset Password</button>
            {message && <p>{message}</p>}
            {errorHtml && <div dangerouslySetInnerHTML={{ __html: errorHtml }} />}
            </div>
    );
}
