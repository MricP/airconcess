import React from 'react'
import "../../styles/sub-training/CardSubTraining.css"

function CardSubTraining() {
  return (
    <div className='cardSubTraining-container'>
        <img src="/assets/image2.jpg" alt="" />
        <p id='training-name'>Formation PPL</p>
        <hr />
        <section id='conditions-section'>
            <p>Ce tarif comprend</p>
            <section>
                <p> • Formation théorique complète</p>
                <p> • Frais d'examen théorique et pratique</p>
                <p> • Matériel pédagogique</p>
                <p> • Démarches administrative</p>
                <p> • 47h de formation (Tout dépassement horaire sera facturé en supplément)</p>
            </section>
        </section>
        <hr />
        <section>
            <p>Sous-total HT</p>
            <p>7050 €</p>
        </section>
        <section>
            <p>TVA</p>
            <p>1410 €</p>
        </section>
        <hr />
        <section>
            <p>Total TTC</p>
            <p>8460 €</p>
        </section>
        
    </div>
  )
}

export default CardSubTraining