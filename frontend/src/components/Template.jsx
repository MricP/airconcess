import React from 'react'
import Header from './graphic-charter/Header'
import Footer from './graphic-charter/Footer'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Template({children}) {

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

    if (location.pathname === "/services" || location.pathname === "/product" || location.pathname === "/appointment"){
      if (scrolled){
        color = "white-black"
      } else {
        color = "transparent-black"
      }
    } else if (location.pathname === "/" || location.pathname === "/contact-us" || location.pathname === "/catalog"){
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