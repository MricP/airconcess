import { useState, useEffect, useRef } from "react";
import "../../styles/our-services/TrainingService.css";
import DarkButton from "../general/DarkButton";
import ScrollDownButton from "../general/ScrollDownButton";
import { useMediaQuery } from 'react-responsive';

export default function TrainingService() {
    const isMobile = useMediaQuery({ maxWidth: 992 });
    const sectionRef = useRef(null);
    const [scrollLength, setScrollLength] = useState(window.innerHeight);

    useEffect(() => {
        if (sectionRef.current) {
            setScrollLength(isMobile ? sectionRef.current.offsetHeight - window.innerHeight * 0.1 : window.innerHeight * 0.9);
        }
    }, [isMobile]); 

    return (
        <div className="training-service" ref={sectionRef}>
            <div className="training-service-top">
                <section className="training-service-left">
                    <h2>Notre Formation PPL</h2>
                    <p>Vous rêvez de prendre les commandes d’un avion et de voler librement ? Notre formation PPL vous permet d'obtenir votre licence de pilote privé,
                        la première étape pour devenir pilote. Avec un programme complet de théorie et de pratique, vous apprendrez à piloter en toute sécurité sur des avions monomoteurs. 
                        Accessible à tous, cette formation est idéale pour les passionnés d'aviation souhaitant voler pour le loisir ou préparer une carrière dans l'aéronautique. 
                        Rejoignez-nous et réalisez votre rêve de voler !</p>
                    <DarkButton className="training-service-button" destination="/training"> Inscrivez-vous dès maintenant </DarkButton>
                </section>
                <div className="training-service-right">
                    <img src="assets/our-services/formation2.jpg" alt="Image formation 1" />
                    <img src="assets/our-services/formation1.jpg" alt="Image formation 2" />
                    <img src="assets/our-services/formation3.jpeg" alt="Image formation 3" />
                </div>
            </div>
            <div className="training-service-bottom">
                <ScrollDownButton scrollLength={scrollLength} colorIcon="black" />
            </div>
        </div>
    );
}
