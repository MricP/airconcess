import React, { useState } from 'react';
import { signIn } from '../../services/auth';
import TwoColumnLayout from '../../components/auth/TwoColumnLayout';
import { Link } from 'react-router-dom';

const SignInPage = () => {
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
      console.log('Error response:', error.response.data.message);
      setErrorHtml(error.response.data.message);
    }
  };

  return (
    <TwoColumnLayout
      leftContainerChildren={
        <img src="" alt="Sign In" />
      }
      rightContainerChildren={
        <div>
          <h1>Se connecter</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Se connecter</button>
          </form>
          <Link to="/reset-password-request">Mot de passe oublié ?</Link>
          {responseMessage && <p>{responseMessage}</p>}
          {errorHtml && <div dangerouslySetInnerHTML={{ __html: errorHtml }} />}
        </div>
      }
    />
  );
};

export default SignInPage;
