import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../styles/landing-page/FirstSectionLanding.css';

function FirstSectionLanding() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, -250]);
    //const y2 = useTransform(scrollY, [0, 300], [0, -150]);
    const y3 = useTransform(scrollY, [0, 300], [100, -110]);
    const arrowDown = '/assets/arrow1-icon.png';

    return (
        <section className='first-section-landing'>
            <motion.p style={{ y: y1 }} className="scroll-first-section">
                scroll to explore
                <span className='arrow-down'>
                    <img src={arrowDown} alt="arrow-down" />
                </span>
            </motion.p>
            <div className='overlay'>
                <div className="first-section-landing-col">
                    <div className='content'>
                        <motion.p className='small-text' style={{ y: y1 }}>Prenez rendez-vous maintenant !</motion.p>
                        <motion.p className='small-text' style={{ y: y1 }}>Votre prochain aéronef vous attend.</motion.p>
                        <motion.h2 className='title' style={{ y: y3 }}>
                            <motion.span style={{ y: y3 }}>Exclusivité </motion.span>
                            <motion.span style={{ y: y3 }}>Rendez-vous </motion.span>
                            <motion.span style={{ y: y3 }}>Personnalisation</motion.span>
                        </motion.h2>
                        <motion.p className='description' style={{ y: y3 }}>
                            Découvrez une expérience unique pour louer ou acheter votre aéronef.
                            Parcourez notre vaste catalogue et réservez un rendez-vous pour trouver le modèle qui vous convient.
                            Choisissez un équipage dédié et des pilotes qualifiés pour une expérience sur mesure.
                            Nous offrons également des formations pour maîtriser votre aéronef.
                            Bénéficiez de notre expertise et de notre attention aux détails !
                        </motion.p>
                    </div>
                    <div className='footer-links'>
                        <Link to='/catalog'>Nos avions</Link>
                        <Link to='/FAQ'>FAQ</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FirstSectionLanding;
