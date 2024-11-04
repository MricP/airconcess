import React, { useState } from 'react';
import { signUp } from '../../services/auth';
import TwoColumnLayout from '../../components/auth/TwoColumnLayout';

const SignUpPage = () => {
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
      if(response.message){
        setErrorHtml(null);        
      }else{
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
        <img src={''} alt="Sign up" />
      }
      rightContainerChildren={
        <div>
          <h1>S'inscrire</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <div>
              <label htmlFor="passwordConfirmation">Confirmer le mot de passe</label>
              <input
                type="password"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <button type="submit">S'inscrire</button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}

          {errorHtml && (
              <div
                  dangerouslySetInnerHTML={{ __html: errorHtml }}
                  style={{ color: 'red', marginTop: '20px' }}
              />
          )}
        </div>
      }
    />
  );
};

export default SignUpPage;
