import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/auth/SignInPage.jsx';
import ProfilePage from './pages/auth/ProfilePage.jsx';
import Error404 from './pages/Error404.jsx';
import SignUpPage from './pages/auth/SignUpPage.jsx';
import TestPage from './pages/TestPage.jsx';
import VerifyEmail from './pages/auth/VerifyEmail.jsx';
import NewPassword from './pages/auth/NewPassword.jsx';
import ResetPasswordRequest from './pages/auth/ResetPasswordRequest.jsx';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='*' element={<Error404 />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/my-profile' element={<ProfilePage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;