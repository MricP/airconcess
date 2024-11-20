import '../../styles/training/SecondTrainingComponent.css'
import DarkButton from '../DarkButton'

export default function SecondTrainingComponent(){
    return (
        <section className="second-training-component">
            <h2>En quoi consiste la formation ?</h2>
            <div className="second-training-component-text">
                <h3>Théorie</h3>
                <p>La partie théorique couvre les bases du pilotage et de la réglementation aérienne. Les matières incluent :</p>
                <ul>
                    <li><p>Réglementation aérienne : Apprentissage des lois et règles qui encadrent le vol.</p></li>
                    <li><p>Navigation : Utilisation des cartes aéronautiques, calcul de cap, et planification de vol.</p></li>
                    <li><p>Météorologie : Compréhension des conditions météorologiques affectant le vol.</p></li>
                    <li><p>Aérodynamique : Étude des principes de vol et des forces en jeu.</p></li>
                    <li><p>Instrumentation : Utilisation des instruments de bord pour contrôler l'avion. Un examen écrit valide cette partie avant de passer aux vols pratiques.</p></li>
                </ul>
            </div>
            <div className="second-training-component-text">
                <h3>Pratique</h3>
                <p>La partie pratique nécessite un minimum de 45 heures de vol, comprenant :</p>
                <ul>
                    <li><p>25 heures en double commande avec un instructeur, où vous apprenez à décoller, atterrir, manœuvrer l'avion, et à gérer les situations d'urgence.</p></li>
                    <li><p>10 heures en solo, où vous volerez de façon autonome, y compris des vols de navigation longue distance avec des atterrissages dans différents aéroports.</p></li>
                </ul>
                <p>Durant la formation, vous apprendrez également à réagir à des pannes moteur, à faire des atterrissages forcés, et à gérer les urgences en vol.</p>
            </div>
            <div className="second-training-component-text">
                <h3>Examen en vol</h3>
                <p>
                Une fois les heures de vol complétées, vous passerez un test en vol avec un examinateur agréé. 
                Celui-ci évalue vos compétences de pilotage, votre capacité à naviguer et à gérer les urgences.</p>
            </div>
            <div className="second-training-component-text">
                <h3>Obtention de la licence</h3>
                <p>
                Après avoir réussi l'examen, vous obtenez votre PPL, qui vous permet de :</p>
                <ul>
                    <li><p>Piloter des avions pour des vols privés.</p></li>
                    <li><p>Embarquer des passagers (non rémunérés).</p></li>
                    <li><p>Voler en France et à l’étranger selon les règlements locaux.</p></li>
                </ul>
                <p>Vous pouvez aussi ajouter des qualifications, comme la licence de vol de nuit ou la qualification IFR (vol aux instruments), 
                    et poursuivre vers la CPL (licence de pilote professionnel) si vous souhaitez devenir pilote commercial.</p>
            </div>
            <DarkButton text={"Acheter la formation"} className={'second-training-component-button'}/>
        </section>
    )
}