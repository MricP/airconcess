import "../../styles/maintenance/SecondMaintenanceComponent.css";

export default function SecondMaintenanceComponent() {
    return(
        <div className="second-maintenance-component">
            <h2>Nos offres</h2>
            <div className="second-maintenance-component-container">
                <div className="second-maintenance-component-container-child">
                    <h3>Offre de base</h3>
                    <p>Services inclus :</p>
                    <ul>
                        <li>Nettoyage extérieur (carlingue, hublots)</li>
                        <li>Nettoyage intérieur (sièges, tapis, cabine)</li>
                        <li>Inspection visuelle des surfaces de contrôle et du train d'atterrissage</li>
                        <li>Vérification de l'état des pneus et des niveaux de fluides</li>
                    </ul>
                    <p>Prix : 200€ par avion</p>
                </div>
                <div className="second-maintenance-component-container-child">
                    <h3>Offre medium</h3>
                    <p>Services inclus :</p>
                    <ul>
                        <li>Services de nettoyage de base</li>
                        <li>Inspection des systèmes électriques et hydrauliques</li>
                        <li>Vérification des freins et du système d'atterrissage</li>
                        <li>Lubrification des composants clés</li>
                        <li>Vérification des niveaux d’huile et autres fluides vitaux</li>
                        <li>Test des systèmes de navigation</li>
                    </ul>
                    <p>Prix : 500€ par avion</p>
                </div>
                <div className="second-maintenance-component-container-child">
                    <h3>Offre premium</h3>
                    <p>Services inclus :</p>
                    <ul>
                        <li>Services de nettoyage et de maintenance préventive</li>
                        <li>Révision complète des moteurs</li>
                        <li>Test approfondi des systèmes électroniques et de navigation</li>
                        <li>Remplacement des pièces usées</li>
                        <li>Diagnostic et résolution des problèmes mécaniques</li>
                        <li>Mise à jour des logiciels embarqués</li>
                        <li>Inspection structurelle complète</li>
                    </ul>
                    <p>Prix : 1000€ par avion</p>
                </div>
            </div>
        </div>
    )
}