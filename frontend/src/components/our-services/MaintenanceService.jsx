import "../../styles/our-services/MaintenanceService.css";
import DarkButton from "../general/DarkButton";
import ScrollUpButton from "../general/ScollUpButton";

export default function MaintenanceService(){
    return(
        <div className="maintenance-service">
            <div className="maintenance-service-top">
                <ScrollUpButton scrollLength={window.innerHeight} colorIcon='black'/>
            </div>
            <div className="maintenance-service-bottom">
                <div className="maintenance-service-left">
                    <img src="assets/maintenance.jpeg" alt="" />
                </div>
                <section className="maintenance-service-right">
                    <h2>Nos Services De Maintenance</h2>
                    <p>Chez Air'Concess, nous proposons des services de maintenance complets pour assurer la sécurité et la performance de votre aéronef. Nos techniciens certifiés, 
                        experts en entretien d'avions, réalisent inspections, réparations et mises à jour selon les normes les plus strictes. Que ce soit pour un contrôle régulier ou une 
                        intervention urgente, nous vous offrons un service rapide, fiable et de haute qualité, garantissant que votre aéronef reste en parfait état de vol.</p>
                    <DarkButton text={"Prendre un rendez-vous"} className={'maintenance-service-button'}/>
                    
                </section>
            </div>
        </div>
    )
}