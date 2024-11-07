import React from 'react';
import '../../styles/landing-page/FirstSectionLanding.css';

function FirstSectionLanding() {
    return (
        <section className='first-section-landing'>
            <div className='overlay'>
                <div className='content'>
                    <p className='small-text'>Prenez rendez-vous maintenant !</p>
                    <p className='small-text'>Votre prochain aéronef vous attend.</p>
                    <h1 className='title'>
                        Exclusivité <br />
                        Rendez-vous <br />
                        Personnalisation
                    </h1>
                    <p className='description'>
                        Découvrez une expérience unique pour louer ou acheter votre aéronef.
                        Parcourez notre vaste catalogue et réservez un rendez-vous pour trouver le modèle qui vous convient.
                        Choisissez un équipage dédié et des pilotes qualifiés pour une expérience sur mesure.
                        Nous offrons également des formations pour maîtriser votre aéronef.
                        Bénéficiez de notre expertise et de notre attention aux détails !
                    </p>
                    <div className='footer-links'>
                        <a href='#'>Nos avions</a>
                        <a href='#'>FAQ</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FirstSectionLanding;
