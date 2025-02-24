import React, { useState, useEffect } from 'react';
import '../../styles/auth/SignUpPage.css';
import { signUp } from '../../services/auth';
import TwoColumnLayout from '../../components/auth/TwoColumnLayout';
import DarkButton2 from '../../components/general/DarkButton2';
import GrayInput from '../../components/general/GrayInput';
import useRedirect from '../../components/Custom-hooks';

const SignUpPage = () => {
  const signUpImg = '/assets/auth/sign-up-img.jpg';
  const airconcessLogo = '/assets/logo-black.png';
  const airconcessLogoPlane = '/assets/airconcess-logo-plane.png';
  const redirect = useRedirect();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setResponseMessage('');
    
    if (password !== passwordConfirmation) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }
    
    try {
      const response = await signUp({ email, password, passwordConfirmation, firstName, lastName });
      setResponseMessage(response.message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  return (
    <TwoColumnLayout
      leftContainerChildren={
        <img src={signUpImg} alt="Sign Up" className="sign-up-img" />
      }
      rightContainerChildren={
        <div className="right-container-sign-up">
          <div className="logos-img-container">
            <img src={airconcessLogoPlane} alt="AirConcess" className="plane-airconcess-logo" />
            <img src={airconcessLogo} alt="AirConcess" className="airconcess-logo" />
          </div>
          <form onSubmit={handleSubmit} className="sign-up-form">
              <label htmlFor="firstName" className="form-label">Prénom*</label>
              <GrayInput placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} required={true} />

              <label htmlFor="lastName" className="form-label">Nom*</label>
              <GrayInput placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} required={true} />

              <label htmlFor="email" className="form-label">Email*</label>
              <GrayInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />

              <label htmlFor="password" className="form-label">Mot de passe*</label>
              <GrayInput type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />

              <label htmlFor="passwordConfirmation" className="form-label">Confirmer le mot de passe*</label>
              <GrayInput type="password" placeholder="Confirmer le mot de passe" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required={true} />

            <DarkButton2 text="S'inscrire" className={"button-sign-up"} use={handleSubmit} />
          </form>
          <div className="sign-in-link-container">
            <p className="sign-in-link-text">Déjà inscrit ?</p>
            <div onClick={() => redirect("/sign-in")} className="sign-in-link">Se connecter</div>
          </div>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      }
    />
  );
};

export default SignUpPage;
