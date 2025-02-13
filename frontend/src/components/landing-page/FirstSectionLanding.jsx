import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../styles/landing-page/FirstSectionLanding.css';

function FirstSectionLanding() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, -250]);
    const y2 = useTransform(scrollY, [0, 300], [100, -110]);
    const y3 = useTransform(scrollY, [0, 300], [400, -100]);
    const arrowDown = '/assets/landing/arrow1-icon.png';

    const [scrolled, setScrolled] = React.useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scrolled]);

    const scrollToSecondSection = () => {
        const secondSection = document.querySelector('#second-section-landing');
        console.log(secondSection);
        if (secondSection) {
            secondSection.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <section className='first-section-landing'>
            <motion.p style={{ y: y1 }} className="scroll-first-section" onClick={scrollToSecondSection}>
                scroller pour explorer
                <span className='arrow-down'>
                    <img src={arrowDown} alt="arrow-down" />
                </span>
            </motion.p>
            <div className='overlay'>
                <div className="first-section-landing-col">
                    <div className='content'>
                        <motion.p className='small-text' style={{ y: y1 }}>Prenez rendez-vous maintenant !</motion.p>
                        <motion.p className='small-text' style={{ y: y1 }}>Votre prochain aéronef vous attend.</motion.p>
                        <motion.h2 className='title' style={{ y: y2 }}>
                            <motion.span style={{ y: y2 }}>Aéronef</motion.span>
                            <motion.span style={{ y: y2 }}>Rendez-vous</motion.span>
                            <motion.span style={{ y: y2 }}>Personnalisation</motion.span>
                        </motion.h2>
                        <motion.p className='description' style={{ y: y3 }}>
                            Découvrez une expérience unique pour acheter votre aéronef ou votre formation.
                            Parcourez notre vaste catalogue et réservez un rendez-vous pour trouver le modèle qui vous convient.
                            Choisissez nous pour une expérience sur mesure.
                            Nous offrons également des formations pour maîtriser votre aéronef.
                            Bénéficiez de notre expertise et de notre attention aux détails !
                        </motion.p>
                    </div>
                    <div className='footer-links'>
                        <Link to='/catalog'>Nos avions</Link>
                        <Link to='/training'>PPL</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FirstSectionLanding;
