import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth/SignUpPage.css';

// services functions
import { signUp } from '../../services/auth';

// components
import TwoColumnLayout from '../../components/auth/TwoColumnLayout';
import DarkButton2 from '../../components/general/DarkButton2';
import GrayInput from '../../components/general/GrayInput';

const SignUpPage = () => {
  const signUpImg = '/assets/auth/sign-up-img.jpg';
  const airconcessLogo = '/assets/logo-black.png';
  const airconcessLogoPlane = '/assets/airconcess-logo-plane.png';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorHtml, setErrorHtml] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp({ email, password, passwordConfirmation, firstName, lastName });
      setResponseMessage(response.message);
      if (response.message) {
        setErrorHtml(null);
      } else {
        setErrorHtml(response);
      }
    } catch (error) {
      console.log('Error response:', error.response?.data?.message || 'Unknown error');
      setErrorHtml(error.response?.data?.message || 'An error occurred');
    }
  };

  React.useEffect(() => {
    const img = new Image();
    img.src = signUpImg;
    img.onload = () => {
      console.log('Width:', img.width);
      console.log('Height:', img.height);
    };
  }, [signUpImg]);

  return (
    <TwoColumnLayout
      leftContainerChildren={
        <img src={signUpImg} alt="Sign Up" className="sign-up-img" />
      }
      rightContainerChildren={
        <div className="right-container">
          <div className="logos-img-container">
            <img src={airconcessLogoPlane} alt="AirConcess" className="plane-airconcess-logo" />
            <img src={airconcessLogo} alt="AirConcess" className="airconcess-logo" />
          </div>
          <form onSubmit={handleSubmit} className="sign-up-form">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">Prénom*</label>
              <GrayInput placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} required={true} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Nom*</label>
              <GrayInput placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} required={true} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email*</label>
              <GrayInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe*</label>
              <GrayInput type={"password"} placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirmation" className="form-label">Confirmer le mot de passe*</label>
              <GrayInput type={"password"} placeholder="Confirmer le mot de passe" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required={true} />
            </div>
            <DarkButton2 text="S'inscrire" use={handleSubmit} />
          </form>
          <div className="sign-in-link-container">
            <p className="sign-in-link-text">Déjà inscrit ?</p>
            <Link to="/sign-in" className="sign-in-link">Se connecter</Link>
          </div>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
          {errorHtml && <div className="error-html" dangerouslySetInnerHTML={{ __html: errorHtml }} />}
        </div>
      }
    />
  );
};

export default SignUpPage;
