import React from 'react'
import "../../styles/profile/ProfileContent.css"

export default function ProfileContent() {
    return (
      <main className='profile-content-container'>
        <div>
            <p><strong>Mes actions en cours</strong></p>
        </div>
        <div className='profile-commentaire-container'>
            <p><strong>Ajouter un commentaire</strong></p>
            <textarea placeholder='Donnez nous votre avis...'></textarea>
            <button>Publier</button>
        </div>
            
      </main>
    )
  
}
