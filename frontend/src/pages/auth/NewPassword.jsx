import React, { useState } from 'react';
import { resetPassword } from '../../services/auth'; 

export default function NewPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorHtml, setErrorHtml] = useState(null);
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); 

    const handleNewPassword = async () => {
        if (newPassword !== confirmPassword) {
            setErrorHtml("Passwords do not match.");
            return;
        }

        if (!token) {
            setErrorHtml("Invalid or missing token.");
            return;
        }

        try {
            const response = await resetPassword({ token, new_password: newPassword });
            setMessage(response.message);
            setErrorHtml(null);
        } catch (error) {
            setErrorHtml(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div>
            <h2>Set New Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleNewPassword}>Reset Password</button>
            {message && <p>{message}</p>}
            {errorHtml && <p style={{ color: 'red' }}>{errorHtml}</p>}
        </div>
    );
}
