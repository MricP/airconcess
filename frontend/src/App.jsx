import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CatalogPage from './pages/CatalogPage.jsx';
import AircraftPage from './pages/admin/AircraftPage.jsx';

function App() {
  
  return (
    <BrowserRouter>
          <ToastContainer />
            <Routes>
              <Route path='/catalog' element={<CatalogPage/>} />
              <Route path='/admin/aircraft' element={<AircraftPage/>} />
            </Routes>
            <ToastContainer />
    </BrowserRouter>
    
  );
}

export default App;
