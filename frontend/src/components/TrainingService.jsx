import { LuLamp } from "react-icons/lu";
import "../styles/TrainingService.css";
import DarkButton from "./DarkButton";

export default function TrainingService() {
    return (
        <div className="training-service">
            <section className="training-service-left">
                <h2>Notre Formation PPL</h2>
                <p>Vous rêvez de prendre les commandes d’un avion et de voler librement ? Notre formation PPL vous permet d'obtenir votre licence de pilote privé,
                     la première étape pour devenir pilote. Avec un programme complet de théorie et de pratique, vous apprendrez à piloter en toute sécurité sur des avions monomoteurs. 
                     Accessible à tous, cette formation est idéale pour les passionnés d'aviation souhaitant voler pour le loisir ou préparer une carrière dans l'aéronautique. 
                     Rejoignez-nous et réalisez votre rêve de voler !</p>
                <DarkButton text={"Inscrivez-vous dès maintenant"} className={'training-service-button'}/>
                
            </section>
            <div className="training-service-right">
                <img src="assets/formation2.jpg" alt="Image formation 1" />
                <img src="assets/formation1.jpg" alt="Image formation 2" />
                <img src="assets/formation3.jpeg" alt="Image formation 3" />
            </div>
        </div>
    )
}