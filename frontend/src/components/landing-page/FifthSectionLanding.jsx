import React from 'react';
import '../../styles/landing-page/FifthSectionLanding.css';

function FifthSectionLanding() {
    return (
        <div className="fifth-section-container">
            <div className="fifth-section-content">
                <div className="fifth-section-left">
                    <h3>Le charme de notre collection</h3>
                    <h2>Clients satisfaits</h2>
                    <p className="fifth-section-text">
                        Découvrez les expériences de nos clients satisfaits et découvrez comment Air Concess
                        les a aidés à réaliser leurs rêves d’aviations.
                    </p>
                </div>
                <div className="fifth-section-right">
                    <p className="testimonial">
                        "Air Concess m’a aidé à réaliser mes rêves d’aviation. La fiche technique de l’avion
                        fournissait des informations détaillées sur chaque appareil et l’équipe du service
                        client était toujours là pour répondre à mes questions."
                    </p>
                    <div className="author-container">
                        <div className="author-name">
                            <span>Dieudonné</span>
                            <span>ATTAL</span>
                        </div>
                        <div className="profile-picture">
                            {/* <img
                                src=""
                                alt="Dieudonné ATTAL"
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FifthSectionLanding;
