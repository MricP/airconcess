import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CatalogPage from './pages/CatalogPage.jsx'


function App() {
  
  return (
    <BrowserRouter>
          <ToastContainer />
            <Routes>
              <Route path='/catalog' element={<CatalogPage/>} />
            </Routes>
            <ToastContainer />
    </BrowserRouter>
    
  );
}

export default App;
