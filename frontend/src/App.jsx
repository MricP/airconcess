import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageServices from './pages/PageServices.jsx';
import PageTraining from './pages/PageTraining.jsx';
import Template from './components/Template.jsx';
import PageMaintenance from './pages/PageMaintenance.jsx';

function App() {
  
  return (
    
    <BrowserRouter>
    <Template>
    <Routes>
      <Route path='/services' element={<PageServices />} />
      <Route path='/training' element={<PageTraining />} />
      <Route path='/maintenance' element={<PageMaintenance />} />
    </Routes>
    <ToastContainer />
    </Template>
  </BrowserRouter>
   
  );
}

export default App;
