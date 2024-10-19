import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <BrowserRouter>
      <ToastContainer>
        <Routes>
          <Route path='*' element={<h1>Erreur</h1>}/>
        </Routes>
      </ToastContainer>
    </BrowserRouter>
    
  );
}

export default App;
