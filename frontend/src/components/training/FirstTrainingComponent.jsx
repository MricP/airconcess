import '../../styles/training/FirstTrainingComponent.css'


export default function FirstTrainingComponent(){
    return (
        <div className="first-training-component">
            <section className="section-container">
                <h2>Notre Formation PPL</h2>
                <p>Vous voulez apprendre à piloter votre avion afin de vous balader dans vos endroits préféré. Vous êtes au bon endroit.
                     Découvrez notre formation et toute notre équipe pédagogique.</p>
            </section>
            <div className="image">
                <img src="assets/training.jpg" alt="" />    
            </div> 
        </div>
    )
}