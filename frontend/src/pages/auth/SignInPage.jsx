import React, { useState } from 'react';
import '../../styles/auth/SignInPage.css';
import { signIn } from '../../services/auth';
import TwoColumnLayout from '../../components/auth/TwoColumnLayout';
import DarkButton2 from '../../components/general/DarkButton2';
import GrayInput from '../../components/general/GrayInput';
import useRedirect from '../../components/Custom-hooks';

const SignInPage = () => {
  const signInImg = '/assets/auth/sign-in-img.jpg';
  const airconcessLogo = '/assets/logo-black.png';
  const airconcessLogoPlane = '/assets/airconcess-logo-plane.png';
  const redirect = useRedirect();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signIn({ email, password });
      setResponseMessage(response.message);
      if (response.token) {
        localStorage.setItem('token', response.token);
        window.location.href = '/';
      } else if (response.message) {
        setErrorMessage(null);
      } else {
        setErrorMessage(response);
      }
    } catch (error) {
      console.log('Error response:', error.response?.data?.message || 'Unknown error');
      setErrorMessage(error.response?.data?.message || 'An error occurred'); // Mise à jour ici
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
        <div className="right-container-sign-in">
          <div className="logos-img-container">
            <img src={airconcessLogoPlane} alt="AirConcess" className="plane-airconcess-logo" />
            <img src={airconcessLogo} alt="AirConcess" className="airconcess-logo" />
          </div>
          <form onSubmit={handleSubmit} className="sign-in-form">
            {responseMessage && (<div className="error-message-div">{responseMessage && <p>○ {responseMessage}</p>}</div>)}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Adresse mail*</label>
              <GrayInput
                id="email"
                name="email"
                placeholder="toto12@exemple.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                autocomplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe*</label>
              <GrayInput
                id="password"
                name="password"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                autocomplete="current-password"
              />
            </div>
            <DarkButton2 text="Se connecter" use={handleSubmit} />
          </form>
          <div className="forgot-password">
            <div onClick={() => redirect("/reset-password-request")} className="forgot-password-link">Mot de passe oublié ?</div>
          </div>
          <div className="sign-up-link-container">
            <p className="sign-up-link-text">Pas encore rejoins l’aventure ?</p>
            <p onClick={() => redirect("/sign-up")} className="sign-up-link">Créer mon compte</p>
          </div>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      }
    />
  );
};

export default SignInPage;
