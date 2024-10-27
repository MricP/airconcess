import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Landing from './pages/Landing';
import PageProduct from './pages/PageProduct';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route index='/' element={<Landing/>}/>
          <Route path='*' element={<h1>Erreur</h1>}/>
          <Route path='/product' element={<PageProduct/>} />
        </Routes>
    </BrowserRouter>  
  );
}

export default App;
