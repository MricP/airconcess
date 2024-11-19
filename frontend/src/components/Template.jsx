import React from 'react'
import Header from './graphic-charter/Header'
import Footer from './graphic-charter/Footer'
import { useEffect, useState } from 'react';

function Template({children}) {
  
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

    if (scrolled){
       color = "white-black"
    } else {
      color = "transparent-black"
    }

  return (
    <div>
        <Header color={color}/>
        {children}
        <Footer/>
    </div>
    
  )
}

export default Template;


