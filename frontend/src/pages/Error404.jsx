import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/error/Error404.css';
import { TbError404Off } from "react-icons/tb";

export default function Error404() {
    return (
        <main className='error-404-main'>
            <div className='error-404-container'>
                <TbError404Off className='error-404-icon' style={{ fontSize: '10rem' }} />
                <div>
                    <p>Page Non Trouvée</p>
                    <p>Désolé, la page que vous recherchez n'existe pas.</p>
                </div>

                <h2>AIR'CONCESS</h2>
                <Link to={'/'} className='link-return'>
                    Retour à l'accueil
                </Link>
            </div>
        </main>
    );
}
