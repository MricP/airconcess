import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUPLandingPage from './pages/SignUpLandingPage';
import ProfilePage from './pages/ProfilePage.jsx';
import Error404 from './pages/Error404.jsx';

function App() {
  
  return (
    <BrowserRouter>
          <ToastContainer />
            <Routes>
              <Route path='*' element={<Error404/>} />
              <Route path='/' element={<LandingPage/>} />
              <Route path='/sign-in' element={<SignInPage/>} />
              <Route path='/sign-up' element={<SignUPLandingPage/>} />
              <Route path='/profile' element={<ProfilePage/>} />
            </Routes>
            <ToastContainer />
    </BrowserRouter>
    
  );
}

export default App;
