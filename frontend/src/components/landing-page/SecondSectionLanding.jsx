import React from 'react';
import '../../styles/landing-page/SecondSectionLanding.css';
import useRedirect from '../Custom-hooks';

function SecondSectionLanding() {
    const choix1 = '/assets/landing/bg-offer1.jpg';
    const choix2 = '/assets/landing/bg-offer2.jpg';
    const choix3 = '/assets/landing/bg-offer3.jpg';
    const redirect = useRedirect();


    const offers = [
        { src: choix1, alt: "choix international et national", text: "Découvrez nos offres internationales et nationales", path: '/catalog/international' },
        { src: choix2, alt: "choix regional", text: "Découvrez nos offres régionales", path: '/catalog/regional' },
        { src: choix3, alt: "choix local", text: "Découvrez nos offres locales", path: '/catalog/local' }
    ];

    return (
        <section className='second-section-landing' id='second-section-landing'>
            <div className="choices-content">
                <div className="choices-container">
                    <h2>
                        Nos offres
                    </h2>
                    <div className="flex-choices-container">
                        {offers.map((offer, index) => (
                            <div key={index} className={`card-container${index + 1}`} onClick={() => redirect(offer.path)}>
                                <div className={`card-choice${index + 1}`}>
                                    <img src={offer.src} alt={offer.alt} />
                                    <p className="text">
                                        {offer.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    )
}

export default SecondSectionLanding;
