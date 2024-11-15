import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/landing-page/SecondSectionLanding.css';

function SecondSectionLanding() {
    const choix1 = '/assets/landing/bg-offer1.jpg';
    const choix2 = '/assets/landing/bg-offer2.jpg';
    const choix3 = '/assets/landing/bg-offer3.jpg'; 
    const navigate = useNavigate();

    return (
        <section className='second-section-landing'>
            <div className="choices-content">
                
                <div className="flex-choices-container">
                    <div className="container1" onClick={() => navigate('/catalog/international')}>
                        <div className="choice1">
                            <img src={choix1} alt="choix international et national" />
                            <p className="text">
                                Découvrez nos offres internationales et nationales
                            </p>
                        </div>
                    </div>
                    <div className="container2" onClick={() => navigate('/catalog/regional')}>
                        <div className="choice2">
                            <img src={choix2} alt="choix regional" />
                            <p className="text">
                                Découvrez nos offres régionales
                            </p>
                        </div>
                    </div>
                    <div className="container3" onClick={() => navigate('/catalog/local')}>
                        <div className="choice3">
                            <img src={choix3} alt="choix local" />
                            <p className="text">
                                Découvrez nos offres locales
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecondSectionLanding;
