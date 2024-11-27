import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth/SignInPage.css';

// services functions
import { signIn } from '../../services/auth';

// components
import TwoColumnLayout from '../../components/auth/TwoColumnLayout';
import DarkButton from '../../components/general/DarkButton';
import GrayInput from '../../components/general/GrayInput';

const SignInPage = () => {
  const signInImg = '/assets/auth/sign-in-img.jpg';
  const airconcessLogo = '/assets/logo-black.png';
  const airconcessLogoPlane = '/assets/airconcess-logo-plane.png';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorHtml, setErrorHtml] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signIn({ email, password });
      setResponseMessage(response.message);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        window.location.href = '/';
      } else if (response.message) {
        setErrorHtml(null);
      } else {
        setErrorHtml(response);
      }
    } catch (error) {
      console.log('Error response:', error.response?.data?.message || 'Unknown error');
      setErrorHtml(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <TwoColumnLayout
      leftContainerChildren={
        <>
          <img src={signInImg} alt="Sign In" className="sign-in-img" />
          <div className="left-container-text">
            <h2 className="left-container-title">
              Se connecter
            </h2>
            <p className="left-container-description">
              Nous avoir rejoins, c'est avoir droit à l'excellence en toute sérénité tout les jours.
            </p>
          </div>
        </>
      }
      rightContainerChildren={
        <div className="right-container">
          <div className="logos-img-container">
            <img src={airconcessLogoPlane} alt="AirConcess" className="plane-airconcess-logo" />
            <img src={airconcessLogo} alt="AirConcess" className="airconcess-logo" />
          </div>
          <form onSubmit={handleSubmit} className="sign-in-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Adresse mail*</label>
              <GrayInput placeholder="toto12@exemple.net" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe*</label>
              <GrayInput type={"password"} placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
            </div>
            <DarkButton text="Se connecter" use={handleSubmit} />
          </form>
          <div className="forgot-password">
            <Link to="/reset-password-request" className="forgot-password-link">Mot de passe oublié ?</Link>
          </div>
          <div className="sign-up-link-container">
            <p className="sign-up-link-text">Pas encore rejoins l’aventure ?</p>
            <Link to="/sign-up" className="sign-up-link">Créer mon compte</Link>
          </div>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
          {errorHtml && <div className="error-html" dangerouslySetInnerHTML={{ __html: errorHtml }} />}
        </div>
      }
    />
  );
};

export default SignInPage;
