import React, {useRef} from 'react'
import "../../styles/profile/ProfileContent.css"
import {createTestimonial} from "../../services/auth.js"
import { useNavigate } from 'react-router-dom'
import {Calendar,Badge} from 'rsuite'

import "../../styles/general/Rsuite-custom.css"

export default function ProfileContent() {
  const navigate = useNavigate()
  const testimonialRef = useRef(null)

  const handleSubmitTestimonial = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    if(!token){
      navigate("sign-in")
      return
    }
    if(testimonialRef.current){
      const value = testimonialRef.current.value;
      createTestimonial(token,value);
      testimonialRef.current.value = ''
    } 
  }

  function renderCell(date) {
    const list = {day: '10-1-2025', time: '10:30 am', title: 'Meeting' };
  
    if (list.length) {
      return <Badge className="calendar-todo-item-badge" />;
    }
  
    return null;
  }

  return (
    <main className='profile-content-container'>
      <div className='profile-actionStatus'>
          <Calendar renderCell={renderCell} />
      </div>
      <div className='profile-commentaire-container'>
        <form method='POST' onSubmit={handleSubmitTestimonial}>
          <p><strong>Ajouter un commentaire</strong></p>
          <textarea ref={testimonialRef} name='testimonial' placeholder='Donnez nous votre avis...'></textarea>
          <button type='submit'>Publier</button>
        </form> 
      </div>
          
    </main>
  )
  
}
