import React, { useState } from 'react';
import { resetPassword } from '../../services/auth';
import TwoColumnLayout from '../../components/auth/TwoColumnLayout';
import DarkButton2 from '../../components/general/DarkButton2';
import GrayInput from '../../components/general/GrayInput';
import '../../styles/auth/ResetPassword.css';

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorHtml, setErrorHtml] = useState(null);   

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const handleNewPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorHtml("Mot de passe et confirmation ne correspondent pas.");
            return;
        }

        if (!token) {
            setErrorHtml("Token non trouvé.");
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

    const newPasswordImg = '/assets/auth/validation-img.jpg';
    const airconcessLogo = '/assets/logo-black.png';

    return (
        <TwoColumnLayout
            leftContainerChildren={
                <div className="left-container">
                    <div className="logos-img-container">
                        <img src={newPasswordImg} alt="New Password" className="new-password-img" />
                    </div>
                </div>
            }
            rightContainerChildren={
                <div className="right-container">
                    <div className="logos-img-container">
                        <img src={airconcessLogo} alt="AirConcess" className="airconcess-logo" />
                    </div>
                    <h2 className="right-container-title">Nouveau mot de passe</h2>
                    <form onSubmit={handleNewPassword} className='reset-password-form'>
                        <div className="form-group">
                            <label htmlFor="new-password" className="form-label">Nouveau mot de passe</label>
                            <GrayInput
                                id="new-password"
                                type="password"
                                placeholder="Nouveau mot de passe"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="password-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password" className="form-label">Confirmer le nouveau mot de passe*</label>
                            <GrayInput
                                id="confirm-password"
                                type="password"
                                placeholder="Confirmer le nouveau mot de passe"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="password-input"
                            />
                        </div>
                        <DarkButton2 text="Réinitialiser le mot de passe" type="submit" className="reset-password-button" />
                    </form>
                    {message && <p className="response-message">{message}</p>}
                    {errorHtml && <p className="error-message">{errorHtml}</p>}
                </div>
            }
        />
    );
}
