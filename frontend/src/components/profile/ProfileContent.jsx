import React, {useRef} from 'react'
import "../../styles/profile/ProfileContent.css"
import {createTestimonial} from "../../services/auth.js"
import { useNavigate } from 'react-router-dom'

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

  return (
    <main className='profile-content-container'>
      <div>
          <p><strong>Mes actions en cours</strong></p>
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
