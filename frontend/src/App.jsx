import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageServices from './pages/PageServices.jsx';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/services' element={<PageServices />} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
   
  );
}

export default App;
