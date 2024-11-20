import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Landing from './pages/Landing';
import PageProduct from './pages/PageProduct';
import PageAppointment from './pages/PageAppointment';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route index='/' element={<Landing/>}/>
          <Route path='*' element={<h1>Erreur</h1>}/>
          <Route path='/product' element={<PageProduct/>} />
          <Route path='/rdv' element={<PageAppointment/>} />
        </Routes>
    </BrowserRouter>  
  );
}

export default App;
