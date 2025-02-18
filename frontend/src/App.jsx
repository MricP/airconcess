import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/auth/SignInPage';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import Error404 from './pages/Error404.jsx';
import SignUpPage from './pages/auth/SignUpPage';
import PageProduct from './pages/product/PageProduct.jsx';
import VerifyEmail from './pages/auth/VerifyEmail';
import ResetPasswordRequest from './pages/auth/ResetPasswordRequest';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import Template from './components/Template.jsx';
import PageServices from './pages/our-services/PageServices.jsx';
import PageTraining from './pages/training/PageTraining.jsx';
import ContactPage from './pages/contact/ContactPage.jsx';
import PageAppointment from './pages/appointment/PageAppointment.jsx';
import PageMaintenance from './pages/maintenance/PageMaintenance.jsx';
import PageAdmin from './pages/admin/PageAdmin.jsx';
import CatalogPage from './pages/catalog/CatalogPage.jsx';
import CguPage from './pages/polities/CguPage.jsx';
import LegalNoticesPage from './pages/polities/LegalNoticesPage.jsx';
import PrivacyPage from './pages/polities/PrivacyPage.jsx';
import PageSubTraining from './pages/sub-training/PageSubTraining.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {
   return (
    <BrowserRouter>
      <Template>
        <ToastContainer position="top-center" autoClose={3000} newestOnTop closeOnClick rtl={false} draggable pauseOnHover style={{ top: '70px' }} />
          <Routes>
            <Route path='*' element={<Error404 />} />
            <Route path='/' element={<LandingPage />} index />
            <Route path='/sign-in' element={<SignInPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/catalog' element={<CatalogPage/>} />
            <Route path='/catalog/:type' element= {<CatalogPage/>} />
            <Route path='/my-profile' element={<ProfilePage />} />
            <Route path='/product' element={<PageProduct />} />
            <Route path='/product/:id' element={<PageProduct />} />
            <Route path='/appointment' element={<PageAppointment />} />
            <Route path='/appointment/:id' element={<PageAppointment />} />
            <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='/services' element={<PageServices />} />
            <Route path='/contact-us' element={<ContactPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/training' element={<PageTraining />} />
            <Route path='/sub-training' element={<PageSubTraining />} />
            <Route path='/maintenance' element={<PageMaintenance />} />
            <Route path='/admin' element={<PageAdmin />} />
            {/*polities*/}
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='/legal-notices' element={<LegalNoticesPage />} />
            <Route path='/cgu' element={<CguPage />} />
          </Routes>
      </Template>
    </BrowserRouter>
  );
}

export default App;