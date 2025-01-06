import React, { useEffect, useState } from 'react';
import { verifyEmail } from '../../services/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import TwoColumnLayout from '../../components/auth/TwoColumnLayout';
import DarkButton2 from '../../components/general/DarkButton2';
import '../../styles/auth/VerifyEmail.css';

export default function VerifyEmail() {
    const [errorHtml, setErrorHtml] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const verifyEmailImg = '/assets/auth/validation-img.jpg';
    const airconcessLogo = '/assets/logo-black.png';
    const airconcessLogoPlane = '/assets/airconcess-logo-plane.png';

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

    const handleRetour = () => {
        navigate('/');
    }

    return (
        <TwoColumnLayout
            leftContainerChildren={
                <div className="left-container">
                    <div className="logos-img-container">
                        <img src={verifyEmailImg} alt="Verify Email" className="verify-email-img" />
                    </div>
                </div>
            }
            rightContainerChildren={
                responseMessage ? (
                    <div className="right-container">
                        <div className="logos-img-container">
                            <img src={airconcessLogo} alt="AirConcess" className="airconcess-logo" />
                        </div>
                        <div className="right-container">
                            <h2 className="right-container-title">Votre email a bien été validé !</h2>
                            <p className='right-container-para'>Vous pouvez maintenant acheter, louer et réserver.</p>
                            <DarkButton2 text="Retourner à l’accueil" use={() => handleRetour()} className="verify-email-retour" />
                            {responseMessage && <p className="response-message">{responseMessage}</p>}
                            {errorHtml && (
                                <div
                                    dangerouslySetInnerHTML={{ __html: errorHtml }}
                                    className="error-html"
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="right-container">
                        <div className="logos-img-container">
                            <img src={airconcessLogoPlane} alt="AirConcess" className="plane-airconcess-logo" />
                            <img src={airconcessLogo} alt="AirConcess" className="airconcess-logo" />
                        </div>
                        <h2 className='right-container-title'>tu n'as rien à faire ici !</h2>
                        <p className='right-container-para'>Veuillez vérifier votre email.</p>
                        <DarkButton2 text="Retour" use={() => handleRetour()} className="verify-email-retour" />
                    </div>
                )
            }
        />
    );
}