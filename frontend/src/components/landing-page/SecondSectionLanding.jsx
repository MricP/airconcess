import React from 'react';
import '../../styles/landing-page/SecondSectionLanding.css';

function SecondSectionLanding() {
    const choix1 = '/assets/landing/bg-offer1.jpg';
    const choix2 = '/assets/landing/bg-offer2.jpg';
    const choix3 = '/assets/bg-offer3.jpg';
    return (
        <section className='second-section-landing'>
            <div className="choices-content">
                <div className="title">
                    <h2>Nos offres</h2>
                </div>
                <div className="flex-choices-container">
                    <div className="container1">
                        <div className="choices1">
                            <img src={choix1} alt="choix international et national" />
                        </div>
                    </div>
                    <div className="container2">
                        <div className="choices2">
                            <img src={choix2} alt="choix regional" />
                        </div>
                    </div>
                    <div className="container3">
                        <div className="choices3">
                            <img src={choix3} alt="choix local" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecondSectionLanding;
