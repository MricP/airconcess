import React from 'react'
import Header from './graphic-charter/Header'
import Footer from './graphic-charter/Footer'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ChatbotComponent from './chatbot/ChatbotComponent';
import useAuth from '../hooks/useAuth';

function Template({children}) {
  useAuth();
  let location = useLocation();
  
  const [scrolled, setScrolled] = useState(false);
  let color

    useEffect(() => {
        
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };

    }, [scrolled]);

    const productRegex = /^\/product\/\d+$/;
    // const apptRegex = /^\/appointment\/\d+$/;
    const catalogRegex = /^\/catalog\/\d+$/;

    if (location.pathname === "/services" || productRegex.test(location.pathname) 
      // || location.pathname === "/appointment" || apptRegex.test(location.pathname) 
      || location.pathname === "/catalog" || catalogRegex.test(location.pathname)){
      if (scrolled){
        color = "white-black"
      } else {
        color = "transparent-black"
      }
    } else if (location.pathname === "/" || location.pathname === "/contact-us" ){
      if (scrolled){
        color = "black-white"
      } else {
        color = "transparent-white"
      }
    } else {
      color = "white-black"
    }

  return (
    <div>
        <Header color={color}/>
          {children}
        { <Footer/>}
    </div>
    
  )
}

export default Template;