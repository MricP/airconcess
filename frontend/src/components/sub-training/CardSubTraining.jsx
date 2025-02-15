import React from 'react'
import "../../styles/sub-training/CardSubTraining.css"

function CardSubTraining() {
    const price = 7050;
    const TVA = 20; // 20%
    const finalPrice = price+price*(1/TVA);
    
    return (
        <div className='cardSubTraining-container'>
            <div>
                <img src="/assets/image2.jpg" alt="" />
                <p id='training-name'>Formation PPL</p>
            </div>
            <div className='info-div'>
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
            </div>
            <div className='price-div'>
                <hr/>
                <section className='price-ht-section'>
                    <p>Sous-total HT</p>
                    <p className='price'>{`${price} €`}</p>
                </section>
                <section className='tva-section'>
                    <p>{`TVA (${TVA}%)`}</p>
                    <p className='price'>{`${price*(1/TVA)} €`}</p>
                </section>
                <hr />
                <section className='price-ttc-section'>
                    <p>Total TTC</p>
                    <p className='price'>{`${finalPrice} €`}</p>
                </section>
            </div>
        </div>
    )
}

export default CardSubTraining