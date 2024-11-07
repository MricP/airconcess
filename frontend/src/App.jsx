import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import TrainingService from './components/TrainingService.jsx';

function App() {
  
  return (
    <BrowserRouter>
    <Header color={"transparent-black"}/>
    <TrainingService />
    <Routes>
      
    </Routes>
    <ToastContainer />
    <Footer />
  </BrowserRouter>
   
  );
}

export default App;
