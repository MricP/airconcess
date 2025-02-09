import React, { useEffect } from 'react';
import useRedirect from '../components/Custom-hooks';

import "../styles/ResultPage.css"
import DarkButton from '../components/general/DarkButton';


function ResultPage({ message="", redirectionMessage="Retourner à l'accueil",redirectTo="/", delay = 3000 }) {
    const redirect = useRedirect();

    useEffect(() => {
        const timer = setTimeout(() => {
            redirect(redirectTo);
        }, delay);

        return () => clearTimeout(timer);
    }, [redirect,delay,redirectTo]);

    return (
        <div className="result-page">
            <h3>{message}</h3>
            <DarkButton type="button" onClick={()=>redirect(redirectTo)}>{redirectionMessage}</DarkButton>
        </div>
    );
}

export default ResultPage;
