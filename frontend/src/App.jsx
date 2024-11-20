import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/auth/SignInPage';
import ProfilePage from './pages/auth/ProfilePage';
import Error404 from './pages/Error404.jsx';
import SignUpPage from './pages/auth/SignUpPage';
import TestPage from './pages/TestPage';
import VerifyEmail from './pages/auth/VerifyEmail';
import ResetPasswordRequest from './pages/auth/ResetPasswordRequest';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import Template from './components/Template';
import PageServices from './pages/PageServices.jsx';
import ContactPage from './pages/ContactPage.jsx';

function App() {

  return (
    <BrowserRouter>
      <Template>
        <ToastContainer />
        <Routes>
          <Route path='*' element={<Error404 />} />
          <Route path='/' element={<LandingPage />} index />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/my-profile' element={<ProfilePage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/services' element={<PageServices />} />
          <Route path='/contact-us' element={<ContactPage />} />
        </Routes>
        <ToastContainer />
      </Template>
    </BrowserRouter>

  );
}

export default App;