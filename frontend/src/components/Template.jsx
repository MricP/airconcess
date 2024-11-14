import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Template({children}) {
  return (
    <div>
        <Header color={"transparent-black"}/>
        {children}
        <Footer/>
    </div>
    
  )
}

export default Template;
