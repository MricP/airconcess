import '../../styles/training/ThirdTrainingComponent.css'

export default function ThirdTrainingComponent() {
    return (
        <div className="third-training-component">
            <h2>Pourquoi notre formation ?</h2>
            <div className="third-training-component-image">
                <div className='third-training-component-container third-training-component-first'>
                    <h3>Matériel avancé</h3>
                    <p>Utilisation de simulateurs de vol de dernière génération, offrant une immersion complète dans des conditions réelles de vol.</p>
                </div>
                <div className='third-training-component-container third-training-component-second'>
                    <h3>Suivi régulier du matériel</h3>
                    <p>En tant que concessionnaire, vous avez l'expertise et les ressources pour assurer une maintenance régulière des appareils de formation.</p>
                </div>
                <div className='third-training-component-container third-training-component-third'>
                    <h3>Avions modernes</h3>
                    <p>Utilisation des appareils dotés de systèmes avioniques modernes, tels que des écrans de navigation numérique, des systèmes de pilotage automatique avancés.</p>
                </div>
            </div>
        </div>
    )
}