import React, { useState } from 'react';
import { resetPasswordRequest } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import TwoColumnLayout from '../../components/auth/TwoColumnLayout';
import DarkButton from '../../components/DarkButton';
import GrayInput from '../../components/GrayInput';
import '../../styles/auth/ResetPasswordRequest.css';

export default function ResetPasswordRequest() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorHtml, setErrorHtml] = useState(null);
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        try {
            const response = await resetPasswordRequest({ email });
            if (response.message) {
                setMessage('Le lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.');
                setErrorHtml(null);
            } else {
                setErrorHtml(response);
            }
        } catch (error) {
            console.log('Error response:', error.response.data.message);
            setErrorHtml(error.response.data.message);
        }
    };

    const handleRetour = () => {
        navigate('/');
    }

    const resetPasswordImg = '/assets/auth/validation-img.jpg';
    const airconcessLogo = '/assets/logo-black.png';

    return (
        <TwoColumnLayout
            leftContainerChildren={
                <div className="left-container">
                    <div className="logos-img-container">
                        <img src={resetPasswordImg} alt="Reset Password" className="reset-password-img" />
                    </div>
                </div>
            }
            rightContainerChildren={
                <div className="right-container">
                    <div className="logos-img-container">
                        <img src={airconcessLogo} alt="AirConcess" className="airconcess-logo" />
                    </div>
                    <h2 className="right-container-title">Réinitialiser le mot de passe</h2>
                    <form onSubmit={handleResetPassword} className='reset-password-form'>
                        <div className="form-group">
                            <label htmlFor="email" className="input-label">Adresse e-mail</label>
                            <GrayInput
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="email-input"
                            />
                        </div>
                        <DarkButton text="Recevoir le mail" type="submit" className="reset-password-button" />
                    </form>
                    {message && <p className="response-message">{message}</p>}
                    {errorHtml && (
                        <div
                            dangerouslySetInnerHTML={{ __html: errorHtml }}
                            className="error-html"
                        />
                    )}
                </div>
            }
        />
    );
}
