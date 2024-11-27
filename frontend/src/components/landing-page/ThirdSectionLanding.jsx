import React, { useEffect, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import '../../styles/landing-page/ThirdSectionLanding.css';
import { useMediaQuery } from 'react-responsive';

function ThirdSectionLanding() {
    const { scrollY } = useScroll();
    const [sectionTop, setSectionTop] = useState(0);
    const planeIcon = '/assets/landing/plane-icon.png';
    const barLanding = '/assets/landing/bar-landing.png';

    useEffect(() => {
        const handleScroll = () => {
            const sectionElement = document.querySelector('.third-section-landing-new');
            if (sectionElement) {
                setSectionTop(sectionElement.offsetTop);
            }
        };
        handleScroll();
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, []);
    const isMobile = useMediaQuery({ query: '(max-width: 723px)' });
    const isMobile2 = useMediaQuery({ query: '(max-width: 489px)' });
    const leftPosition = isMobile2 ? '-68px' : isMobile ? '-57px' : '10px';
    const marginTopPosition = isMobile2 ? '0px' : isMobile ? '0px' : '50px';

    const yPosition = isMobile2 ? 200 : isMobile ? 100 : 100;
    const yRange = useTransform(scrollY, [sectionTop, sectionTop + 400], [yPosition, yPosition + 500]);
    const opacity = useTransform(scrollY, [sectionTop + 600, sectionTop + 800], [1, 0]);
    const rotate = useTransform(scrollY, [sectionTop + 800, sectionTop + 1000], [0, 180]);



    return (
        <section className="third-section-landing-new">
            <div className="third-section-container-new">
                <div className="plane-animation" style={{ backgroundImage: `url(${barLanding})` }}>
                    <motion.img
                        src={planeIcon}
                        alt="Airplane Icon"
                        style={{
                            marginTop: marginTopPosition,
                            position: 'absolute',
                            top: 0,
                            left: leftPosition,
                            y: yRange,
                            opacity: opacity,
                            rotate: rotate,
                            transition: { type: "spring", stiffness: 50 },
                            zIndex: 1,
                        }}
                    />
                </div>
                <div className="third-section-text-new">
                    <h2>Étapes d'acquisition</h2>
                    <div className="third-section-steps-container">
                        <div className="steps-text">
                            <h3>1. Trouver votre avion</h3>
                            <p>Découvrez notre vaste sélection d'avions, qu'il s'agisse d'un achat ou d'une location. Explorez notre catalogue, classé par autonomie, nombre de sièges et année de fabrication. Trouvez l'aéronef qui correspond parfaitement à vos besoins.</p>
                        </div>
                        <div className="steps-text">
                            <h3>2. Prendre rendez-vous avec un vendeur</h3>
                            <p>Une fois que vous avez sélectionné l'avion de vos rêves, il est temps de concrétiser votre projet ! Prenez rendez-vous avec l'un de nos experts qui vous accompagnera dans le processus d'achat ou de location. Vous pouvez également choisir vos pilotes pour une expérience sur mesure.</p>
                        </div>
                        <div className="steps-text">
                            <h3>3. Conclure par un serrage de main !</h3>
                            <p>Après avoir finalisé tous les détails, il est temps de célébrer cette nouvelle étape ! Un dernier échange, un serrage de main, et votre aventure aérienne commence. Faites confiance à Air Concess pour vous guider tout au long de votre parcours.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ThirdSectionLanding;
