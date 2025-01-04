import React from 'react'
import "../../styles/profile/ProfileContent.css"

export default function ProfileContent() {
    return (
      <main className='profile-content-container'>
        <div className='profile-commentaire-container'>
            <p><strong>Ajouter un commentaire</strong></p>
            <textarea placeholder='Ajouter un commentaire'></textarea>
            <button>Publier</button>
        </div>
            
      </main>
    )
  
}
