import React from 'react'
import "../../styles/about/AboutPage.css"

export function AboutPage() {
    
    const AboutMainImg = '/assets/about/aboutMainImg.jpg';

    return (
      <main className='about-ourStory'>
            <div className='about-intro'>
                <img src={AboutMainImg}  alt="Our story explaination" />
                
                <div className='about-storyContent'>
                    <h3>Notre Histoire</h3>
                    <div className='about-middleIntroLine'></div>
                    <p>AirConcess a été créé en 2024 par 4 passionnés d’aviation, unis par leur vision commune de rendre l'acquisition et la gestion d'aéronefs plus accessibles et transparentes. Grâce à une expertise pointue et un service personnalisé, AirConcess accompagne ses clients tout au long de leur projet, en leur offrant des solutions sur mesure adaptées à leurs besoins spécifiques. Que ce soit pour l'achat d'aéronefs ou la formation de pilote, AirConcess s'engage à fournir des services de qualité, tout en partageant sa passion pour l'aviation avec chaque client. </p>
                </div>
            </div>
            <h2>Nos Fondateurs</h2>
            <div>
                <div className='about-pictures-container'>
                    <div><div className='about-carreImg Florian'></div> <p><strong>Florian Filloux</strong></p></div>
                    <div><div className='about-carreImg Matheo'></div> <p><strong>Matheo Flores</strong></p></div>
                    <div><div className='about-carreImg Emric'></div> <p><strong>Emric Pirrera</strong></p></div>
                    <div><div className='about-carreImg Sacha'></div> <p><strong>Sacha Roux</strong></p></div>
                </div>
                
            </div>
      </main>
    )
  
}
export default AboutPage;