import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth/SignInPage.css';

// services functions
import { signIn } from '../../services/auth';

// components
import TwoColumnLayout from '../../components/auth/TwoColumnLayout';
import DarkButton from '../../components/DarkButton';
import GrayInput from '../../components/GrayInput';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorHtml, setErrorHtml] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const signInImg = '/assets/auth/sign-in-img.jpg';

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
          <h1 className="right-container-title">Se connecter</h1>
          <form onSubmit={handleSubmit} className="sign-in-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <GrayInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <GrayInput placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <DarkButton text="Se connecter" use={handleSubmit} />
          </form>
          <Link to="/reset-password-request" className="forgot-password-link">Mot de passe oublié ?</Link>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
          {errorHtml && <div className="error-html" dangerouslySetInnerHTML={{ __html: errorHtml }} />}
        </div>
      }
    />
  );
};

export default SignInPage;
