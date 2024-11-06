import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  
  return (
    <BrowserRouter>
    <Header color={"black-white"}/>
    <Routes>
      
    </Routes>
    <ToastContainer />
    <Footer />
  </BrowserRouter>
   
  );
}

export default App;
